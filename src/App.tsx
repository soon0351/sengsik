import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { IngredientsSection } from './components/IngredientsSection';
import { TargetAudienceSection } from './components/TargetAudienceSection';
import { HowToConsumeSection } from './components/HowToConsumeSection';
import { ProductOrderSection, productOptions } from './components/ProductOrderSection';
import { OrderModal } from './components/OrderModal';
import { SellerAdminModal } from './components/SellerAdminModal';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';
import { Order, User, ProductOption, OrderStatus } from './types';
import { apiFetchOrders, apiUpdateOrderStatus } from './lib/api';

export default function App() {
  // App State
  const [orders, setOrders] = useState<Order[]>([]);
  const [isStreamConnected, setIsStreamConnected] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Modal States
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isSellerAdminOpen, setIsSellerAdminOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Selected Product for Order
  const [selectedProductOption, setSelectedProductOption] = useState<ProductOption>(productOptions[0]);
  const [orderQuantity, setOrderQuantity] = useState<number>(1);

  // Success Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const productSectionRef = useRef<HTMLDivElement>(null);

  // Restore current user from localStorage if present
  useEffect(() => {
    try {
      const saved = localStorage.getItem('haru_current_user');
      if (saved) {
        setCurrentUser(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Fetch orders from API
  const fetchOrders = async () => {
    try {
      const list = await apiFetchOrders();
      if (Array.isArray(list)) {
        setOrders(list);
      }
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    }
  };

  // Real-time Server-Sent Events (SSE) connection & Polling Fallback
  useEffect(() => {
    fetchOrders();

    let eventSource: EventSource | null = null;
    try {
      eventSource = new EventSource('/api/orders/stream');

      eventSource.onopen = () => {
        setIsStreamConnected(true);
      };

      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'orders_update' || data.type === 'initial') {
            if (Array.isArray(data.orders)) {
              setOrders(data.orders);
            }
          }
        } catch {
          // ignore non-json keepalive comments
        }
      };

      eventSource.onerror = () => {
        setIsStreamConnected(false);
      };
    } catch (err) {
      console.error('SSE initialization error:', err);
      setIsStreamConnected(false);
    }

    // Safety polling every 4 seconds in case SSE drops
    const pollInterval = setInterval(() => {
      fetchOrders();
    }, 4000);

    return () => {
      clearInterval(pollInterval);
      if (eventSource) {
        eventSource.close();
      }
    };
  }, []);

  // Auth Handlers
  const handleAuthSuccess = (user: User) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('haru_current_user', JSON.stringify(user));
    } catch (e) {
      console.error(e);
    }
    showToast(`${user.name} 님, 환영합니다!`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('haru_current_user');
    } catch (e) {
      console.error(e);
    }
    showToast('로그아웃 되었습니다.');
  };

  // Show Toast
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Order Handlers
  const handleStartOrder = (option: ProductOption, quantity: number) => {
    setSelectedProductOption(option);
    setOrderQuantity(quantity);
    setIsOrderModalOpen(true);
  };

  const handleOrderCompleted = (newOrder: Order) => {
    showToast(`새 주문 (${newOrder.orderNumber})이 등록되었습니다.`);
    fetchOrders();
  };

  // Seller Admin: Update Status
  const handleUpdateOrderStatus = async (orderId: string, nextStatus: OrderStatus) => {
    try {
      const data = await apiUpdateOrderStatus(orderId, nextStatus);
      if (data.success) {
        showToast(`주문 상태가 '${nextStatus}'(으)로 변경되었습니다.`);
        fetchOrders();
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const handleScrollToProduct = () => {
    const el = document.getElementById('product');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#fbf9f5] text-[#2d2a26] flex flex-col selection:bg-[#2c5e3b] selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1b3a24] text-white px-5 py-3.5 rounded-2xl shadow-xl font-bold text-[18px] border border-[#2c5e3b] animate-bounce">
          {toastMessage}
        </div>
      )}

      {/* Top Navigation */}
      <Header
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        onOpenAdmin={() => setIsSellerAdminOpen(true)}
        onScrollToProduct={handleScrollToProduct}
        orderCount={orders.length}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero onOrderClick={handleScrollToProduct} />

        {/* Ingredients Section (50 domestic whole foods) */}
        <IngredientsSection />

        {/* Recommended For Section (3 cards) */}
        <TargetAudienceSection />

        {/* How to Consume (3 steps) */}
        <HowToConsumeSection />

        {/* Product Purchase Section */}
        <div ref={productSectionRef}>
          <ProductOrderSection onStartOrder={handleStartOrder} />
        </div>
      </main>

      {/* Footer & Legal Notices */}
      <Footer />

      {/* Order & Mock Payment Modal */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        selectedOption={selectedProductOption}
        quantity={orderQuantity}
        currentUser={currentUser}
        onOrderCompleted={handleOrderCompleted}
        onOpenSellerAdmin={() => setIsSellerAdminOpen(true)}
      />

      {/* Seller Order Management Live Dashboard Modal */}
      <SellerAdminModal
        isOpen={isSellerAdminOpen}
        onClose={() => setIsSellerAdminOpen(false)}
        orders={orders}
        onRefreshOrders={fetchOrders}
        onUpdateOrderStatus={handleUpdateOrderStatus}
        isStreamConnected={isStreamConnected}
      />

      {/* Auth Modal (Login / Register) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </div>
  );
}
