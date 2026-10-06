import React, { useState } from 'react';
import { Order, OrderStatus } from '../types';
import {
  X,
  RefreshCw,
  Search,
  Package,
  Truck,
  CheckCircle,
  Clock,
  Radio,
  MapPin,
  Phone,
  User as UserIcon,
} from 'lucide-react';

interface SellerAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  onRefreshOrders: () => void;
  onUpdateOrderStatus: (orderId: string, nextStatus: OrderStatus) => Promise<void>;
  isStreamConnected: boolean;
}

export const SellerAdminModal: React.FC<SellerAdminModalProps> = ({
  isOpen,
  onClose,
  orders,
  onRefreshOrders,
  onUpdateOrderStatus,
  isStreamConnected,
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  if (!isOpen) return null;

  const filteredOrders = orders.filter((order) => {
    const matchesFilter = filterStatus === 'all' || order.status === filterStatus;
    const matchesSearch =
      searchTerm.trim() === '' ||
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.phone.includes(searchTerm);
    return matchesFilter && matchesSearch;
  });

  const handleStatusChange = async (orderId: string, nextStatus: OrderStatus) => {
    try {
      setUpdatingId(orderId);
      await onUpdateOrderStatus(orderId, nextStatus);
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  // Status counts
  const countPaid = orders.filter((o) => o.status === '결제완료').length;
  const countShipping = orders.filter((o) => o.status === '배송중').length;
  const countDone = orders.filter((o) => o.status === '배송완료').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#fbf9f5] w-full max-w-5xl rounded-3xl border-2 border-[#e9e1d0] shadow-2xl overflow-hidden my-6 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-[#f5f0e6] px-6 py-5 border-b border-[#e9e1d0] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-3.5 h-3.5 rounded-full bg-[#2c5e3b]" />
            <div>
              <h2 className="text-2xl font-black text-[#1b3a24] flex items-center gap-3">
                <span>판매자 주문관리 시스템</span>
                <span className="text-[15px] font-semibold text-white bg-[#2c5e3b] px-2.5 py-0.5 rounded-full">
                  실시간 연동
                </span>
              </h2>
              <div className="text-[16px] text-[#5e584f] mt-0.5 flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 text-[#2c5e3b] font-medium">
                  <Radio className="w-4 h-4 animate-pulse" />
                  {isStreamConnected ? '실시간 주문 수신 활성화 (SSE)' : '폴링 수신 모드'}
                </span>
                <span>·</span>
                <span>새 주문 접수 시 화면에 즉시 자동 반영됩니다.</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onRefreshOrders}
              type="button"
              className="min-h-[48px] px-4 py-2 rounded-xl border border-[#d6caa5] bg-white hover:bg-[#f5f0e6] text-[#2d2a26] font-semibold text-[17px] flex items-center gap-2 transition-colors"
              title="주문 목록 새로고침"
            >
              <RefreshCw className="w-4 h-4 text-[#2c5e3b]" />
              <span>새로고침</span>
            </button>
            <button
              onClick={onClose}
              type="button"
              className="min-h-[48px] w-12 rounded-xl text-stone-600 hover:text-[#1b3a24] hover:bg-white flex items-center justify-center transition-colors"
              aria-label="닫기"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Filter and Metrics Bar */}
        <div className="bg-white p-5 border-b border-[#e9e1d0] space-y-4">
          {/* Metrics summary cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[17px]">
            <div
              onClick={() => setFilterStatus('all')}
              className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                filterStatus === 'all'
                  ? 'border-[#2c5e3b] bg-[#e5ece5]'
                  : 'border-[#e9e1d0] bg-[#fbf9f5] hover:border-[#b3c7b3]'
              }`}
            >
              <div className="text-[15px] text-[#5e584f] font-medium">전체 주문</div>
              <div className="text-2xl font-black text-[#1b3a24] tabular-nums mt-0.5">
                {orders.length}건
              </div>
            </div>

            <div
              onClick={() => setFilterStatus('결제완료')}
              className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                filterStatus === '결제완료'
                  ? 'border-[#2c5e3b] bg-[#e5ece5]'
                  : 'border-[#e9e1d0] bg-[#fbf9f5] hover:border-[#b3c7b3]'
              }`}
            >
              <div className="text-[15px] text-amber-800 font-medium flex items-center gap-1">
                <Clock className="w-4 h-4" />
                결제완료 (발송대기)
              </div>
              <div className="text-2xl font-black text-amber-900 tabular-nums mt-0.5">
                {countPaid}건
              </div>
            </div>

            <div
              onClick={() => setFilterStatus('배송중')}
              className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                filterStatus === '배송중'
                  ? 'border-[#2c5e3b] bg-[#e5ece5]'
                  : 'border-[#e9e1d0] bg-[#fbf9f5] hover:border-[#b3c7b3]'
              }`}
            >
              <div className="text-[15px] text-blue-800 font-medium flex items-center gap-1">
                <Truck className="w-4 h-4" />
                배송중
              </div>
              <div className="text-2xl font-black text-blue-900 tabular-nums mt-0.5">
                {countShipping}건
              </div>
            </div>

            <div
              onClick={() => setFilterStatus('배송완료')}
              className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                filterStatus === '배송완료'
                  ? 'border-[#2c5e3b] bg-[#e5ece5]'
                  : 'border-[#e9e1d0] bg-[#fbf9f5] hover:border-[#b3c7b3]'
              }`}
            >
              <div className="text-[15px] text-emerald-800 font-medium flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                배송완료
              </div>
              <div className="text-2xl font-black text-emerald-900 tabular-nums mt-0.5">
                {countDone}건
              </div>
            </div>
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="주문번호, 주문자명, 연락처로 검색..."
              className="w-full min-h-[48px] pl-12 pr-4 rounded-xl border-2 border-[#d6caa5] bg-white text-[18px] text-[#2d2a26] focus:border-[#2c5e3b]"
            />
          </div>
        </div>

        {/* Order Cards List Container */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-[#e9e1d0] space-y-3">
              <Package className="w-12 h-12 text-stone-300 mx-auto" />
              <div className="text-2xl font-bold text-[#1b3a24]">해당 조건의 주문이 없습니다</div>
              <p className="text-[17px] text-[#5e584f]">
                새 주문이 접수되면 실시간으로 이곳에 자동으로 등록됩니다.
              </p>
            </div>
          ) : (
            filteredOrders.map((order) => {
              const isUpdating = updatingId === order.id;

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-3xl p-6 border-2 border-[#e9e1d0] shadow-sm hover:border-[#2c5e3b] transition-all space-y-4"
                >
                  {/* Order Top Meta */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#f5f0e6]">
                    <div className="flex items-center gap-3">
                      <span className="text-[18px] font-black font-mono text-[#1b3a24] bg-[#f5f0e6] px-3 py-1 rounded-lg">
                        {order.orderNumber}
                      </span>
                      <span className="text-[16px] text-[#5e584f]">
                        {new Date(order.createdAt).toLocaleString('ko-KR')}
                      </span>
                    </div>

                    {/* Current Status Badge */}
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[16px] font-extrabold px-3.5 py-1 rounded-xl flex items-center gap-1.5 ${
                          order.status === '결제완료'
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : order.status === '배송중'
                            ? 'bg-blue-100 text-blue-900 border border-blue-300'
                            : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                        }`}
                      >
                        {order.status === '결제완료' && <Clock className="w-4 h-4" />}
                        {order.status === '배송중' && <Truck className="w-4 h-4" />}
                        {order.status === '배송완료' && <CheckCircle className="w-4 h-4" />}
                        <span>{order.status}</span>
                      </span>
                    </div>
                  </div>

                  {/* Customer and Items Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 text-[17px]">
                    {/* Items Info */}
                    <div className="lg:col-span-6 space-y-2">
                      <div className="font-bold text-[#1b3a24] text-[18px] flex items-center gap-2">
                        <Package className="w-5 h-5 text-[#2c5e3b]" />
                        <span>주문 상품 내역</span>
                      </div>
                      {order.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="bg-[#fbf9f5] p-3 rounded-xl border border-[#e9e1d0] flex items-center justify-between"
                        >
                          <div>
                            <span className="font-semibold text-[#1b3a24]">{item.name}</span>
                            <div className="text-[15px] text-[#5e584f]">{item.packageOption}</div>
                          </div>
                          <span className="font-bold text-[#2c5e3b] text-[18px] tabular-nums">
                            {item.count}개
                          </span>
                        </div>
                      ))}

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[#5e584f]">총 결제액 ({order.paymentMethod}):</span>
                        <span className="font-black text-xl text-[#1b3a24] tabular-nums">
                          {order.totalAmount.toLocaleString()}원
                        </span>
                      </div>
                      <div className="text-[14px] text-stone-500 font-mono">
                        카드 승인 번호: {order.cardNumberMasked}
                      </div>
                    </div>

                    {/* Shipping Info */}
                    <div className="lg:col-span-6 space-y-2">
                      <div className="font-bold text-[#1b3a24] text-[18px] flex items-center gap-2">
                        <UserIcon className="w-5 h-5 text-[#2c5e3b]" />
                        <span>수령자 및 배송지 정보</span>
                      </div>

                      <div className="bg-[#fbf9f5] p-3.5 rounded-xl border border-[#e9e1d0] space-y-1.5 text-[16px]">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#1b3a24] text-[17px]">{order.customerName}</span>
                          <span className="text-[#5e584f] flex items-center gap-1">
                            <Phone className="w-4 h-4 text-[#2c5e3b]" />
                            {order.phone}
                          </span>
                        </div>
                        <div className="flex items-start gap-1.5 text-[#2d2a26]">
                          <MapPin className="w-4 h-4 text-[#2c5e3b] shrink-0 mt-1" />
                          <span>
                            {order.address} {order.addressDetail}
                          </span>
                        </div>
                        {order.deliveryMemo && (
                          <div className="text-[15px] text-[#5e584f] pt-1 border-t border-[#e9e1d0]">
                            요청: {order.deliveryMemo}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Status Transition Action Buttons - Stated strictly in prompt */}
                  <div className="pt-3 border-t border-[#e9e1d0] flex flex-wrap items-center justify-between gap-3">
                    <span className="text-[16px] text-[#5e584f]">
                      단계별 상태 변경 (결제완료 → 배송중 → 배송완료):
                    </span>

                    <div className="flex items-center gap-2.5">
                      {order.status === '결제완료' && (
                        <button
                          type="button"
                          disabled={isUpdating}
                          onClick={() => handleStatusChange(order.id, '배송중')}
                          className="min-h-[48px] px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-[17px] transition-colors flex items-center gap-2 shadow-sm disabled:opacity-50"
                        >
                          <Truck className="w-5 h-5" />
                          <span>[배송 시작] 배송중으로 변경</span>
                        </button>
                      )}

                      {order.status === '배송중' && (
                        <button
                          type="button"
                          disabled={isUpdating}
                          onClick={() => handleStatusChange(order.id, '배송완료')}
                          className="min-h-[48px] px-5 py-2.5 rounded-xl bg-[#2c5e3b] hover:bg-[#1b3a24] text-white font-bold text-[17px] transition-colors flex items-center gap-2 shadow-sm disabled:opacity-50"
                        >
                          <CheckCircle className="w-5 h-5" />
                          <span>[배송 완료] 처리</span>
                        </button>
                      )}

                      {order.status === '배송완료' && (
                        <div className="flex items-center gap-2">
                          <span className="text-[16px] font-bold text-[#2c5e3b] flex items-center gap-1">
                            <CheckCircle className="w-5 h-5" />
                            배송 완료된 주문입니다
                          </span>
                          <button
                            type="button"
                            disabled={isUpdating}
                            onClick={() => handleStatusChange(order.id, '배송중')}
                            className="min-h-[44px] px-3 py-1.5 rounded-xl border border-[#d6caa5] bg-white text-stone-600 hover:text-stone-900 text-sm font-semibold transition-colors"
                            title="상태 되돌리기"
                          >
                            상태 수정
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
