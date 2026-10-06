import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;
const DATA_DIR = path.resolve(process.cwd(), 'data');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

// Ensure data folder exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

export interface OrderItem {
  id: string;
  name: string;
  packageOption: string;
  count: number;
  price: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  status: '결제완료' | '배송중' | '배송완료';
  items: OrderItem[];
  totalAmount: number;
  customerName: string;
  phone: string;
  address: string;
  addressDetail?: string;
  deliveryMemo?: string;
  paymentMethod: string;
  cardNumberMasked: string;
  userEmail?: string;
}

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  phone?: string;
  address?: string;
  createdAt: string;
}

// Initial sample orders for realistic demo
const initialSampleOrders: Order[] = [
  {
    id: 'ord-seed-1',
    orderNumber: 'ORD-20261006-2184',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    status: '배송중',
    items: [
      {
        id: 'saengsik-50-main',
        name: '하루채움 순수생식 50',
        packageOption: '30포 (1개월분 / 40g×30)',
        count: 1,
        price: 48000,
      },
    ],
    totalAmount: 48000,
    customerName: '김민준',
    phone: '010-8921-3421',
    address: '서울특별시 종로구 삼청로 48',
    addressDetail: '202호',
    deliveryMemo: '부재 시 문 앞에 놓아주세요',
    paymentMethod: '신용카드 (모의 결제)',
    cardNumberMasked: '1111-2222-****-4444',
    userEmail: 'minjun.kim@example.com',
  },
  {
    id: 'ord-seed-2',
    orderNumber: 'ORD-20261006-7912',
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    status: '배송완료',
    items: [
      {
        id: 'saengsik-50-main',
        name: '하루채움 순수생식 50',
        packageOption: '60포 (2개월 실속형 / 보틀 증정)',
        count: 1,
        price: 89000,
      },
    ],
    totalAmount: 89000,
    customerName: '이서연',
    phone: '010-3419-5820',
    address: '경기도 성남시 분당구 판교역로 166',
    addressDetail: '7동 1403호',
    deliveryMemo: '배송 전 연락 바랍니다',
    paymentMethod: '신용카드 (모의 결제)',
    cardNumberMasked: '1111-2222-****-4444',
    userEmail: 'seoyeon@example.com',
  },
];

// Helper read/write
function readOrders(): Order[] {
  try {
    if (!fs.existsSync(ORDERS_FILE)) {
      fs.writeFileSync(ORDERS_FILE, JSON.stringify(initialSampleOrders, null, 2), 'utf-8');
      return initialSampleOrders;
    }
    const data = fs.readFileSync(ORDERS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading orders file:', err);
    return initialSampleOrders;
  }
}

function writeOrders(orders: Order[]): void {
  try {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing orders file:', err);
  }
}

function readUsers(): User[] {
  try {
    if (!fs.existsSync(USERS_FILE)) {
      const defaultUsers: User[] = [
        {
          id: 'user-demo-1',
          email: 'demo@haruchaeum.kr',
          password: 'password123',
          name: '홍길동',
          phone: '010-1234-5678',
          address: '서울특별시 마포구 월드컵북로 12',
          createdAt: new Date().toISOString(),
        },
      ];
      fs.writeFileSync(USERS_FILE, JSON.stringify(defaultUsers, null, 2), 'utf-8');
      return defaultUsers;
    }
    const data = fs.readFileSync(USERS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading users file:', err);
    return [];
  }
}

function writeUsers(users: User[]): void {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing users file:', err);
  }
}

app.use(express.json());

// SSE Clients for real-time seller order management
const sseClients = new Set<Response>();

function broadcastOrders() {
  const currentOrders = readOrders();
  const payload = `data: ${JSON.stringify({ type: 'orders_update', orders: currentOrders })}\n\n`;
  for (const client of sseClients) {
    try {
      client.write(payload);
    } catch {
      sseClients.delete(client);
    }
  }
}

// Real-time SSE endpoint
app.get('/api/orders/stream', (_req: Request, res: Response) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'X-Accel-Buffering': 'no',
    'Access-Control-Allow-Origin': '*',
  });

  // Initial push
  const currentOrders = readOrders();
  res.write(`data: ${JSON.stringify({ type: 'initial', orders: currentOrders })}\n\n`);

  sseClients.add(res);

  // Heartbeat every 20 seconds
  const heartbeat = setInterval(() => {
    try {
      res.write(': keepalive\n\n');
    } catch {
      clearInterval(heartbeat);
      sseClients.delete(res);
    }
  }, 20000);

  _req.on('close', () => {
    clearInterval(heartbeat);
    sseClients.delete(res);
  });
});

// GET all orders
app.get('/api/orders', (_req: Request, res: Response) => {
  const orders = readOrders();
  res.json({ success: true, orders });
});

// POST new order
app.post('/api/orders', (req: Request, res: Response) => {
  try {
    const {
      items,
      totalAmount,
      customerName,
      phone,
      address,
      addressDetail,
      deliveryMemo,
      paymentMethod,
      cardNumber,
      userEmail,
    } = req.body;

    if (!customerName || !phone || !address || !items || items.length === 0) {
      return res.status(400).json({ success: false, error: '주문 정보가 누락되었습니다.' });
    }

    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
    const randomFour = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `ORD-${dateStr}-${randomFour}`;

    const maskedCard = cardNumber ? `${cardNumber.slice(0, 9)}****-${cardNumber.slice(-4)}` : '1111-2222-****-4444';

    const newOrder: Order = {
      id: `ord-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      orderNumber,
      createdAt: now.toISOString(),
      status: '결제완료',
      items,
      totalAmount: Number(totalAmount) || 48000,
      customerName: String(customerName).trim(),
      phone: String(phone).trim(),
      address: String(address).trim(),
      addressDetail: addressDetail ? String(addressDetail).trim() : '',
      deliveryMemo: deliveryMemo ? String(deliveryMemo).trim() : '배송 전 연락 바랍니다',
      paymentMethod: paymentMethod || '신용카드 (모의 결제)',
      cardNumberMasked: maskedCard,
      userEmail: userEmail || '',
    };

    const orders = readOrders();
    orders.unshift(newOrder); // newest first
    writeOrders(orders);

    // Notify all real-time listeners immediately
    broadcastOrders();

    return res.status(201).json({ success: true, order: newOrder });
  } catch (err: any) {
    console.error('Order creation failed:', err);
    return res.status(500).json({ success: false, error: '주문 생성 중 오류가 발생했습니다.' });
  }
});

// PATCH order status: '결제완료' -> '배송중' -> '배송완료'
app.patch('/api/orders/:id/status', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['결제완료', '배송중', '배송완료'].includes(status)) {
      return res.status(400).json({ success: false, error: '유효하지 않은 주문 상태입니다.' });
    }

    const orders = readOrders();
    const orderIndex = orders.findIndex((o) => o.id === id);

    if (orderIndex === -1) {
      return res.status(404).json({ success: false, error: '해당 주문을 찾을 수 없습니다.' });
    }

    orders[orderIndex].status = status;
    writeOrders(orders);

    broadcastOrders();

    return res.json({ success: true, order: orders[orderIndex] });
  } catch (err: any) {
    console.error('Order status update failed:', err);
    return res.status(500).json({ success: false, error: '주문 상태 업데이트 실패' });
  }
});

// AUTH: Register
app.post('/api/auth/register', (req: Request, res: Response) => {
  try {
    const { email, password, name, phone, address } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, error: '이메일과 비밀번호를 입력해주세요.' });
    }

    const cleanEmail = email.toLowerCase().trim();
    const displayName = name ? name.trim() : cleanEmail.split('@')[0];

    const users = readUsers();
    if (users.some((u) => u.email.toLowerCase() === cleanEmail)) {
      return res.status(409).json({ success: false, error: '이미 등록된 이메일 계정입니다. 로그인을 진행해주세요.' });
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      email: cleanEmail,
      password,
      name: displayName,
      phone: phone ? phone.trim() : '',
      address: address ? address.trim() : '',
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    writeUsers(users);

    const { password: _, ...userWithoutPassword } = newUser;
    return res.status(201).json({ success: true, user: userWithoutPassword });
  } catch (err: any) {
    console.error('Registration failed:', err);
    return res.status(500).json({ success: false, error: '회원가입 처리 실패' });
  }
});

// AUTH: Login (smart detection of unregistered email vs wrong password)
app.post('/api/auth/login', (req: Request, res: Response) => {
  try {
    const { email, password, autoRegisterIfNew } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, error: '이메일과 비밀번호를 입력해주세요.' });
    }

    const cleanEmail = email.toLowerCase().trim();
    const users = readUsers();
    const existingUser = users.find((u) => u.email.toLowerCase() === cleanEmail);

    if (!existingUser) {
      // If autoRegisterIfNew was requested, create user immediately
      if (autoRegisterIfNew) {
        const newUser: User = {
          id: `user-${Date.now()}`,
          email: cleanEmail,
          password,
          name: cleanEmail.split('@')[0],
          createdAt: new Date().toISOString(),
        };
        users.push(newUser);
        writeUsers(users);
        const { password: _, ...userWithoutPassword } = newUser;
        return res.json({ success: true, user: userWithoutPassword, newlyCreated: true });
      }

      // Friendly notification that email is not registered yet
      return res.status(404).json({
        success: false,
        notRegistered: true,
        email: cleanEmail,
        error: '아직 회원가입되지 않은 이메일입니다. 회원가입 탭으로 이동하시거나, 아래 [이 정보로 바로 가입 및 로그인] 버튼을 눌러주세요.',
      });
    }

    if (existingUser.password !== password) {
      return res.status(401).json({
        success: false,
        passwordMismatch: true,
        email: cleanEmail,
        error: '비밀번호가 일치하지 않습니다. 비밀번호를 다시 확인하시거나 새 비밀번호로 재설정할 수 있습니다.',
      });
    }

    const { password: _, ...userWithoutPassword } = existingUser;
    return res.json({ success: true, user: userWithoutPassword });
  } catch (err: any) {
    console.error('Login failed:', err);
    return res.status(500).json({ success: false, error: '로그인 처리 실패' });
  }
});

// AUTH: Quick Password Reset or Update
app.post('/api/auth/reset-password', (req: Request, res: Response) => {
  try {
    const { email, newPassword } = req.body;
    if (!email || !newPassword) {
      return res.status(400).json({ success: false, error: '이메일과 새 비밀번호를 입력해주세요.' });
    }

    const cleanEmail = email.toLowerCase().trim();
    const users = readUsers();
    const userIndex = users.findIndex((u) => u.email.toLowerCase() === cleanEmail);

    if (userIndex === -1) {
      // Create user with this new password
      const newUser: User = {
        id: `user-${Date.now()}`,
        email: cleanEmail,
        password: newPassword,
        name: cleanEmail.split('@')[0],
        createdAt: new Date().toISOString(),
      };
      users.push(newUser);
      writeUsers(users);
      const { password: _, ...userWithoutPassword } = newUser;
      return res.json({ success: true, user: userWithoutPassword, message: '새 계정이 생성되어 로그인되었습니다.' });
    }

    users[userIndex].password = newPassword;
    writeUsers(users);

    const { password: _, ...userWithoutPassword } = users[userIndex];
    return res.json({ success: true, user: userWithoutPassword, message: '비밀번호가 성공적으로 변경되었습니다.' });
  } catch (err: any) {
    console.error('Password reset failed:', err);
    return res.status(500).json({ success: false, error: '비밀번호 재설정 실패' });
  }
});

// Server boot with Vite middleware
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(process.cwd(), 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(process.cwd(), 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
