import React, { useState, useEffect } from 'react';
import { ProductOption, User, Order } from '../types';
import { X, CreditCard, CheckCircle2, AlertTriangle, ArrowRight, ArrowLeft, ShieldCheck, Home } from 'lucide-react';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedOption: ProductOption;
  quantity: number;
  currentUser: User | null;
  onOrderCompleted: (order: Order) => void;
  onOpenSellerAdmin: () => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  selectedOption,
  quantity,
  currentUser,
  onOrderCompleted,
  onOpenSellerAdmin,
}) => {
  // 1: Shipping info, 2: Mock Payment, 3: Success Confirmation
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [addressDetail, setAddressDetail] = useState('');
  const [deliveryMemo, setDeliveryMemo] = useState('부재 시 문 앞에 놓아주세요');

  // Payment State - Prefilled as strictly requested
  const [cardNumber, setCardNumber] = useState('1111-2222-3333-4444');
  const [cardExpiry, setCardExpiry] = useState('12/29');
  const [cardCvc, setCardCvc] = useState('777');
  const [cardCompany, setCardCompany] = useState('하루생식 안심카드');

  // Loading & Result
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Prefill if user logged in
  useEffect(() => {
    if (currentUser) {
      if (currentUser.name && !customerName) setCustomerName(currentUser.name);
      if (currentUser.phone && !phone) setPhone(currentUser.phone);
      if (currentUser.address && !address) setAddress(currentUser.address);
    }
  }, [currentUser]);

  // Reset state when opening modal with new session
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setErrorMessage('');
      setCompletedOrder(null);
      if (!customerName && currentUser?.name) setCustomerName(currentUser.name);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const totalAmount = selectedOption.price * quantity;

  // Step 1 Validation
  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      setErrorMessage('주문하시는 분의 성함을 입력해주세요.');
      return;
    }
    if (!phone.trim()) {
      setErrorMessage('연락처(전화번호)를 입력해주세요.');
      return;
    }
    if (!address.trim()) {
      setErrorMessage('배송받으실 기본 주소를 입력해주세요.');
      return;
    }
    setErrorMessage('');
    setStep(2);
  };

  // Step 2 Submission (Mock Payment & Database Save)
  const handleExecutePayment = async () => {
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const orderPayload = {
        items: [
          {
            id: 'saengsik-50-main',
            name: '하루채움 순수생식 50',
            packageOption: selectedOption.name,
            count: quantity,
            price: selectedOption.price,
          },
        ],
        totalAmount,
        customerName: customerName.trim(),
        phone: phone.trim(),
        address: address.trim(),
        addressDetail: addressDetail.trim(),
        deliveryMemo,
        paymentMethod: '신용카드 (모의 결제)',
        cardNumber,
        userEmail: currentUser?.email || '',
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || '주문 접수에 실패했습니다.');
      }

      setCompletedOrder(data.order);
      onOrderCompleted(data.order);
      setStep(3);
    } catch (err: any) {
      setErrorMessage(err.message || '결제 처리 중 통신 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#fbf9f5] w-full max-w-2xl rounded-3xl border-2 border-[#e9e1d0] shadow-2xl overflow-hidden my-8">
        {/* Modal Top Bar */}
        <div className="bg-[#f5f0e6] px-6 py-5 border-b border-[#e9e1d0] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-[#2c5e3b]" />
            <h2 className="text-2xl font-bold text-[#1b3a24]">
              {step === 1 && '주문서 작성 · 배송지 입력'}
              {step === 2 && '모의 결제 진행'}
              {step === 3 && '주문 완료'}
            </h2>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="p-2 rounded-xl text-stone-600 hover:text-[#1b3a24] hover:bg-white transition-colors"
            aria-label="닫기"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Order Summary Miniature */}
          {step !== 3 && (
            <div className="bg-white p-5 rounded-2xl border border-[#e9e1d0] flex items-center justify-between">
              <div>
                <div className="text-[19px] font-bold text-[#1b3a24]">
                  하루채움 순수생식 50
                </div>
                <div className="text-[17px] text-[#5e584f]">
                  {selectedOption.name} · 수량 {quantity}개
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-extrabold text-[#2c5e3b] tabular-nums">
                  {totalAmount.toLocaleString()}원
                </div>
                <div className="text-[15px] text-[#2c5e3b] font-medium">
                  무료배송
                </div>
              </div>
            </div>
          )}

          {errorMessage && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-300 text-red-800 text-[17px] font-medium">
              {errorMessage}
            </div>
          )}

          {/* STEP 1: Shipping Details */}
          {step === 1 && (
            <form onSubmit={handleProceedToPayment} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[18px] font-bold text-[#1b3a24] mb-2">
                    받는 분 성함 <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="예: 홍길동"
                    className="w-full min-h-[50px] px-4 rounded-xl border-2 border-[#d6caa5] bg-white text-[18px] text-[#2d2a26] focus:border-[#2c5e3b] focus:ring-0"
                  />
                </div>

                <div>
                  <label className="block text-[18px] font-bold text-[#1b3a24] mb-2">
                    연락처 (휴대폰) <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="예: 010-1234-5678"
                    className="w-full min-h-[50px] px-4 rounded-xl border-2 border-[#d6caa5] bg-white text-[18px] text-[#2d2a26] focus:border-[#2c5e3b] focus:ring-0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[18px] font-bold text-[#1b3a24] mb-2">
                  배송지 주소 <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="예: 서울특별시 마포구 월드컵북로 12"
                  className="w-full min-h-[50px] px-4 rounded-xl border-2 border-[#d6caa5] bg-white text-[18px] text-[#2d2a26] focus:border-[#2c5e3b] focus:ring-0 mb-3"
                />
                <input
                  type="text"
                  value={addressDetail}
                  onChange={(e) => setAddressDetail(e.target.value)}
                  placeholder="상세주소 (예: 4층 401호 / 동·호수)"
                  className="w-full min-h-[50px] px-4 rounded-xl border-2 border-[#d6caa5] bg-white text-[18px] text-[#2d2a26] focus:border-[#2c5e3b] focus:ring-0"
                />
              </div>

              <div>
                <label className="block text-[18px] font-bold text-[#1b3a24] mb-2">
                  배송 요청사항
                </label>
                <select
                  value={deliveryMemo}
                  onChange={(e) => setDeliveryMemo(e.target.value)}
                  className="w-full min-h-[50px] px-4 rounded-xl border-2 border-[#d6caa5] bg-white text-[18px] text-[#2d2a26] focus:border-[#2c5e3b]"
                >
                  <option value="부재 시 문 앞에 놓아주세요">부재 시 문 앞에 놓아주세요</option>
                  <option value="배송 전 미리 연락 부탁드립니다">배송 전 미리 연락 부탁드립니다</option>
                  <option value="경비실에 맡겨주세요">경비실에 맡겨주세요</option>
                  <option value="택배함에 보관해 주세요">택배함에 보관해 주세요</option>
                </select>
              </div>

              {/* Sample Autofill Quick Button */}
              <div className="pt-1 flex items-center justify-between text-[16px] text-[#5e584f]">
                <span>테스트용 정보가 필요하신가요?</span>
                <button
                  type="button"
                  onClick={() => {
                    setCustomerName('김민수');
                    setPhone('010-9876-5432');
                    setAddress('서울특별시 강남구 테헤란로 152');
                    setAddressDetail('강남파이낸스센터 12층');
                  }}
                  className="underline text-[#2c5e3b] font-semibold hover:text-[#1b3a24]"
                >
                  테스트 주소 자동 입력
                </button>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full min-h-[54px] rounded-2xl bg-[#1b3a24] hover:bg-[#2c5e3b] text-white font-bold text-[20px] transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  <span>결제 단계로 이동</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Mock Payment Screen */}
          {step === 2 && (
            <div className="space-y-6">
              {/* LARGE MANDATORY WARNING BADGE */}
              <div className="bg-amber-100 border-3 border-amber-500 rounded-2xl p-5 flex items-start gap-3.5 shadow-sm">
                <AlertTriangle className="w-8 h-8 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <div className="text-[20px] font-black text-amber-900 leading-snug">
                    ⚠️ 실제로 결제되지 않는 모의 결제입니다
                  </div>
                  <div className="text-[17px] text-amber-800 mt-1 leading-relaxed">
                    테스트용 주문 등록 및 상태 변경 확인용 시뮬레이션입니다. 실제 은행이나 카드사 승인이 발생하지 않습니다.
                  </div>
                </div>
              </div>

              {/* Mock Credit Card Form */}
              <div className="bg-white rounded-2xl p-6 border-2 border-[#e9e1d0] space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#e9e1d0]">
                  <div className="flex items-center gap-2 font-bold text-[19px] text-[#1b3a24]">
                    <CreditCard className="w-5 h-5 text-[#2c5e3b]" />
                    <span>신용 / 체크카드 (모의 테스트)</span>
                  </div>
                  <span className="text-[16px] text-[#2c5e3b] font-bold">
                    카드번호 사전 입력됨
                  </span>
                </div>

                {/* Card Number - Prefilled as strictly requested */}
                <div>
                  <label className="block text-[18px] font-bold text-[#1b3a24] mb-2">
                    카드번호
                  </label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full min-h-[50px] px-4 rounded-xl border-2 border-[#2c5e3b] bg-[#e5ece5]/30 text-[20px] font-mono font-bold text-[#1b3a24] focus:ring-0"
                  />
                  <span className="text-[15px] text-[#5e584f] mt-1 block">
                    ※ 규정에 따라 &apos;1111-2222-3333-4444&apos; 가 기본 입력되어 있습니다.
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[18px] font-bold text-[#1b3a24] mb-2">
                      유효기간 (MM/YY)
                    </label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full min-h-[50px] px-4 rounded-xl border-2 border-[#d6caa5] bg-white text-[18px] font-mono text-[#2d2a26]"
                    />
                  </div>

                  <div>
                    <label className="block text-[18px] font-bold text-[#1b3a24] mb-2">
                      CVC (3자리)
                    </label>
                    <input
                      type="password"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      className="w-full min-h-[50px] px-4 rounded-xl border-2 border-[#d6caa5] bg-white text-[18px] font-mono text-[#2d2a26]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[18px] font-bold text-[#1b3a24] mb-2">
                    카드사 구분
                  </label>
                  <select
                    value={cardCompany}
                    onChange={(e) => setCardCompany(e.target.value)}
                    className="w-full min-h-[50px] px-4 rounded-xl border-2 border-[#d6caa5] bg-white text-[18px] text-[#2d2a26]"
                  >
                    <option value="하루생식 안심카드">하루생식 안심카드 (테스트 전용)</option>
                    <option value="현대/신한/국민 (모의)">현대/신한/국민 (모의)</option>
                    <option value="카카오뱅크/토스 (모의)">카카오뱅크/토스 (모의)</option>
                  </select>
                </div>
              </div>

              {/* Total Payment Amount Notice */}
              <div className="p-4 rounded-2xl bg-[#f5f0e6] border border-[#e9e1d0] flex items-center justify-between">
                <span className="text-[18px] text-[#2d2a26]">모의 승인 예정 금액</span>
                <span className="text-2xl font-black text-[#1b3a24]">
                  {totalAmount.toLocaleString()}원
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="min-h-[54px] px-5 rounded-2xl border-2 border-[#d6caa5] bg-white hover:bg-[#f5f0e6] text-[#2d2a26] font-bold text-[18px] transition-colors flex items-center gap-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>이전</span>
                </button>

                {/* Big Green [결제 성공] button as requested */}
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleExecutePayment}
                  className="flex-1 min-h-[54px] rounded-2xl bg-[#2c5e3b] hover:bg-[#1b3a24] text-white font-extrabold text-[20px] transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 active:scale-[0.99]"
                >
                  {isSubmitting ? (
                    <span>결제 처리 중...</span>
                  ) : (
                    <>
                      <CheckCircle2 className="w-6 h-6" />
                      <span>[결제 성공] 주문 완료하기</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Order Completed Confirmation */}
          {step === 3 && completedOrder && (
            <div className="space-y-6 text-center">
              <div className="w-20 h-20 rounded-full bg-[#e5ece5] text-[#2c5e3b] flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-12 h-12" />
              </div>

              <div>
                <h3 className="text-3xl font-black text-[#1b3a24]">
                  주문이 성공적으로 접수되었습니다!
                </h3>
                <p className="text-[18px] text-[#5e584f] mt-2">
                  신선한 50종 자연 원물 생식을 안전하게 포장하여 보내드리겠습니다.
                </p>
              </div>

              {/* Order Number Box */}
              <div className="bg-white rounded-3xl p-6 border-2 border-[#2c5e3b] text-left space-y-3 shadow-md">
                <div className="flex items-center justify-between pb-3 border-b border-[#e9e1d0]">
                  <span className="text-[17px] text-[#5e584f]">발급 주문번호</span>
                  <span className="text-2xl font-black text-[#1b3a24] font-mono tracking-wide">
                    {completedOrder.orderNumber}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[17px]">
                  <div>
                    <span className="text-[#7a746a]">주문 일시: </span>
                    <span className="font-semibold text-[#2d2a26]">
                      {new Date(completedOrder.createdAt).toLocaleString('ko-KR')}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#7a746a]">결제 상태: </span>
                    <span className="font-bold text-[#2c5e3b]">
                      {completedOrder.status}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#7a746a]">받는 분: </span>
                    <span className="font-semibold text-[#2d2a26]">
                      {completedOrder.customerName} ({completedOrder.phone})
                    </span>
                  </div>
                  <div>
                    <span className="text-[#7a746a]">결제 금액: </span>
                    <span className="font-bold text-[#1b3a24]">
                      {completedOrder.totalAmount.toLocaleString()}원 (모의 결제)
                    </span>
                  </div>
                </div>

                <div className="pt-2 text-[17px]">
                  <span className="text-[#7a746a]">배송 주소: </span>
                  <span className="font-semibold text-[#2d2a26]">
                    {completedOrder.address} {completedOrder.addressDetail}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#e5ece5] text-[#1b3a24] text-[17px] flex items-center justify-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#2c5e3b]" />
                <span>데이터베이스에 저장되어 판매자 주문관리에서 실시간으로 확인 가능합니다.</span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenSellerAdmin();
                  }}
                  className="w-full sm:flex-1 min-h-[54px] rounded-2xl bg-[#2c5e3b] hover:bg-[#1b3a24] text-white font-bold text-[19px] transition-colors flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-5 h-5" />
                  <span>판매자 주문관리에서 확인하기</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto min-h-[54px] px-6 rounded-2xl border-2 border-[#d6caa5] bg-white hover:bg-[#f5f0e6] text-[#2d2a26] font-bold text-[18px] transition-colors flex items-center justify-center gap-2"
                >
                  <Home className="w-5 h-5" />
                  <span>쇼핑 계속하기</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
