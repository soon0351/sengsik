import { Order, OrderStatus, User } from '../types';

const STORAGE_ORDERS_KEY = 'haru_orders_storage';
const STORAGE_USERS_KEY = 'haru_users_storage';

const initialSeedOrders: Order[] = [
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

const initialSeedUsers: Array<User & { password?: string }> = [
  {
    id: 'user-demo-1',
    email: 'demo@haruchaeum.kr',
    name: '홍길동',
    password: 'password123',
    phone: '010-1234-5678',
    address: '서울특별시 마포구 월드컵북로 12',
  },
  {
    id: 'user-stephanos',
    email: 'stephanos0351@gmail.com',
    name: '스테파노',
    password: 'password123',
    phone: '010-9876-5432',
    address: '서울특별시 강남구 테헤란로 152',
  },
];

function getLocalOrders(): Order[] {
  try {
    const raw = localStorage.getItem(STORAGE_ORDERS_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_ORDERS_KEY, JSON.stringify(initialSeedOrders));
      return initialSeedOrders;
    }
    return JSON.parse(raw);
  } catch {
    return initialSeedOrders;
  }
}

function saveLocalOrders(orders: Order[]) {
  try {
    localStorage.setItem(STORAGE_ORDERS_KEY, JSON.stringify(orders));
  } catch (e) {
    console.error(e);
  }
}

function getLocalUsers(): Array<User & { password?: string }> {
  try {
    const raw = localStorage.getItem(STORAGE_USERS_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(initialSeedUsers));
      return initialSeedUsers;
    }
    return JSON.parse(raw);
  } catch {
    return initialSeedUsers;
  }
}

function saveLocalUsers(users: Array<User & { password?: string }>) {
  try {
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
  } catch (e) {
    console.error(e);
  }
}

// Fetch all orders
export async function apiFetchOrders(): Promise<Order[]> {
  try {
    const res = await fetch('/api/orders');
    const contentType = res.headers.get('content-type');
    if (res.ok && contentType && contentType.includes('application/json')) {
      const data = await res.json();
      if (data.success && Array.isArray(data.orders)) {
        saveLocalOrders(data.orders);
        return data.orders;
      }
    }
  } catch {
    // fallback
  }
  return getLocalOrders();
}

// Create an order
export async function apiCreateOrder(payload: any): Promise<{ success: boolean; order: Order }> {
  try {
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const contentType = res.headers.get('content-type');
    if (res.ok && contentType && contentType.includes('application/json')) {
      const data = await res.json();
      if (data.success && data.order) {
        return data;
      }
    }
  } catch {
    // fallback
  }

  // Local fallback for static Vercel hosting
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
  const randomFour = Math.floor(1000 + Math.random() * 9000);
  const orderNumber = `ORD-${dateStr}-${randomFour}`;

  const newOrder: Order = {
    id: `ord-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    orderNumber,
    createdAt: now.toISOString(),
    status: '결제완료',
    items: payload.items,
    totalAmount: Number(payload.totalAmount) || 48000,
    customerName: String(payload.customerName).trim(),
    phone: String(payload.phone).trim(),
    address: String(payload.address).trim(),
    addressDetail: payload.addressDetail || '',
    deliveryMemo: payload.deliveryMemo || '배송 전 연락 바랍니다',
    paymentMethod: payload.paymentMethod || '신용카드 (모의 결제)',
    cardNumberMasked: payload.cardNumber ? `${payload.cardNumber.slice(0, 9)}****-${payload.cardNumber.slice(-4)}` : '1111-2222-****-4444',
    userEmail: payload.userEmail || '',
  };

  const current = getLocalOrders();
  current.unshift(newOrder);
  saveLocalOrders(current);
  return { success: true, order: newOrder };
}

// Update order status
export async function apiUpdateOrderStatus(orderId: string, status: OrderStatus): Promise<{ success: boolean; order?: Order }> {
  try {
    const res = await fetch(`/api/orders/${orderId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    const contentType = res.headers.get('content-type');
    if (res.ok && contentType && contentType.includes('application/json')) {
      const data = await res.json();
      if (data.success) {
        return data;
      }
    }
  } catch {
    // fallback
  }

  // Local fallback
  const current = getLocalOrders();
  const index = current.findIndex((o) => o.id === orderId);
  if (index !== -1) {
    current[index].status = status;
    saveLocalOrders(current);
    return { success: true, order: current[index] };
  }
  return { success: false };
}

// Login
export async function apiLogin(payload: { email: string; password: string; autoRegisterIfNew?: boolean }): Promise<any> {
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await res.json();
      return data;
    }
  } catch {
    // fallback
  }

  // Local fallback
  const cleanEmail = payload.email.toLowerCase().trim();
  const users = getLocalUsers();
  const existing = users.find((u) => u.email.toLowerCase() === cleanEmail);

  if (!existing) {
    if (payload.autoRegisterIfNew) {
      const newUser = {
        id: `user-${Date.now()}`,
        email: cleanEmail,
        name: cleanEmail.split('@')[0],
        password: payload.password,
        createdAt: new Date().toISOString(),
      };
      users.push(newUser);
      saveLocalUsers(users);
      return { success: true, user: newUser };
    }
    return {
      success: false,
      notRegistered: true,
      error: '아직 회원가입되지 않은 이메일입니다. 회원가입을 진행하시거나 아래 버튼을 눌러주세요.',
    };
  }

  if (existing.password !== payload.password) {
    return {
      success: false,
      passwordMismatch: true,
      error: '비밀번호가 일치하지 않습니다.',
    };
  }

  return { success: true, user: existing };
}

// Register
export async function apiRegister(payload: any): Promise<any> {
  try {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await res.json();
      return data;
    }
  } catch {
    // fallback
  }

  const cleanEmail = payload.email.toLowerCase().trim();
  const users = getLocalUsers();
  if (users.some((u) => u.email.toLowerCase() === cleanEmail)) {
    return { success: false, error: '이미 등록된 이메일 계정입니다.' };
  }

  const newUser = {
    id: `user-${Date.now()}`,
    email: cleanEmail,
    name: payload.name || cleanEmail.split('@')[0],
    password: payload.password,
    phone: payload.phone || '',
    address: payload.address || '',
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  saveLocalUsers(users);
  return { success: true, user: newUser };
}

// Reset Password
export async function apiResetPassword(payload: { email: string; newPassword: string }): Promise<any> {
  try {
    const res = await fetch('/api/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await res.json();
      return data;
    }
  } catch {
    // fallback
  }

  const cleanEmail = payload.email.toLowerCase().trim();
  const users = getLocalUsers();
  const index = users.findIndex((u) => u.email.toLowerCase() === cleanEmail);

  if (index !== -1) {
    users[index].password = payload.newPassword;
    saveLocalUsers(users);
    return { success: true, user: users[index] };
  } else {
    const newUser = {
      id: `user-${Date.now()}`,
      email: cleanEmail,
      name: cleanEmail.split('@')[0],
      password: payload.newPassword,
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    saveLocalUsers(users);
    return { success: true, user: newUser };
  }
}
