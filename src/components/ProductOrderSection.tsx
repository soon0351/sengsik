import React, { useState } from 'react';
import { ProductOption } from '../types';
import { ShoppingBag, Truck, Gift, ShieldCheck, Plus, Minus } from 'lucide-react';

interface ProductOrderSectionProps {
  onStartOrder: (selectedOption: ProductOption, quantity: number) => void;
}

export const productOptions: ProductOption[] = [
  {
    id: 'box-1',
    name: '1박스 (30포 / 1개월분)',
    subtext: '40g × 30포 개별 위생 포장 · 처음 시작하시는 분께 추천',
    pouchCount: 30,
    price: 48000,
    originalPrice: 55000,
  },
  {
    id: 'box-2',
    name: '2박스 (60포 / 2개월 실속 세트)',
    subtext: '40g × 60포 · 매일 아침 꾸준한 식사 습관 · 7,000원 추가 할인',
    pouchCount: 60,
    price: 89000,
    originalPrice: 110000,
    bonus: '친환경 트라이탄 쉐이커 보틀(500ml) 무료 증정',
    popular: true,
  },
];

export const ProductOrderSection: React.FC<ProductOrderSectionProps> = ({ onStartOrder }) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string>(productOptions[0].id);
  const [quantity, setQuantity] = useState<number>(1);

  const selectedOption = productOptions.find((opt) => opt.id === selectedOptionId) || productOptions[0];
  const totalPrice = selectedOption.price * quantity;

  const handleIncrement = () => setQuantity((prev) => Math.min(prev + 1, 10));
  const handleDecrement = () => setQuantity((prev) => Math.max(prev - 1, 1));

  return (
    <section id="product" className="py-16 md:py-24 bg-[#f5f0e6]/50 border-b border-[#e9e1d0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl text-left space-y-3 mb-10">
          <div className="text-[17px] font-semibold text-[#2c5e3b] tracking-wide">
            PURE MEAL REPLACEMENT STORE
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1b3a24] tracking-tight">
            하루채움 순수생식 50
          </h2>
          <p className="text-[19px] sm:text-[20px] text-[#2d2a26] leading-relaxed">
            국내산 50종 자연 원물만을 엄선하여 정직하게 담았습니다. 오늘 주문하시면 내일 신선하게 받아보실 수 있습니다.
          </p>
        </div>

        {/* Product Purchase Box */}
        <div className="bg-white rounded-3xl border-2 border-[#e9e1d0] p-6 sm:p-10 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Product Visual Showcase */}
          <div className="lg:col-span-5 space-y-6">
            <div className="w-full aspect-[4/3] rounded-2xl bg-[#f5f0e6] border border-[#e9e1d0] flex flex-col items-center justify-center p-8 relative overflow-hidden">
              {/* Product illustration SVG */}
              <svg viewBox="0 0 280 220" className="w-full h-full max-h-56" fill="none">
                {/* Background aura */}
                <circle cx="140" cy="110" r="85" fill="#e5ece5" />
                {/* Product Box */}
                <rect x="70" y="55" width="140" height="130" rx="8" fill="#f8f4ec" stroke="#234b2f" strokeWidth="3" />
                <rect x="70" y="55" width="140" height="28" rx="8" fill="#2c5e3b" />
                <text x="140" y="74" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">하루채움 순수생식 50</text>
                {/* Box details */}
                <rect x="85" y="95" width="110" height="35" rx="4" fill="#ffffff" stroke="#e9e1d0" />
                <text x="140" y="112" fill="#1b3a24" fontSize="11" fontWeight="bold" textAnchor="middle">국내산 50종 자연 원물 100%</text>
                <text x="140" y="124" fill="#5e584f" fontSize="9" textAnchor="middle">비가열 동결건조 · 40g × 30포</text>
                {/* Green sprout on box */}
                <path d="M140 165 C130 150 120 160 140 140 C160 160 150 150 140 165 Z" fill="#7da379" />
                {/* Pouch leaning on box */}
                <rect x="185" y="85" width="45" height="95" rx="5" fill="#ffffff" stroke="#234b2f" strokeWidth="2" transform="rotate(10 185 85)" />
                <text x="212" y="130" fill="#2c5e3b" fontSize="8" fontWeight="bold" textAnchor="middle" transform="rotate(10 185 85)">1포 40g</text>
              </svg>

              <div className="absolute top-4 left-4 bg-[#1b3a24] text-white text-[15px] font-bold px-3 py-1 rounded-lg">
                국내산 원물 100%
              </div>
            </div>

            {/* Product Trust Features */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-[17px] text-[#2d2a26]">
                <Truck className="w-5 h-5 text-[#2c5e3b] shrink-0" />
                <span>우체국 안심 택배 · 전 지역 무료배송</span>
              </div>
              <div className="flex items-center gap-3 text-[17px] text-[#2d2a26]">
                <Gift className="w-5 h-5 text-[#2c5e3b] shrink-0" />
                <span>2박스 이상 구매 시 친환경 트라이탄 쉐이커 증정</span>
              </div>
              <div className="flex items-center gap-3 text-[17px] text-[#2d2a26]">
                <ShieldCheck className="w-5 h-5 text-[#2c5e3b] shrink-0" />
                <span>HACCP 인증 제조 시설 · 잔류농약 불검출 검증</span>
              </div>
            </div>
          </div>

          {/* Right Column: Option Selection & Purchase Module */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1b3a24]">
                하루채움 순수생식 50
              </h3>
              <p className="text-[18px] text-[#5e584f] mt-1">
                식품의 유형: 일반식품 (생식함유제품) · 내용량: 1포당 40g
              </p>
            </div>

            {/* Option Radios */}
            <div className="space-y-3">
              <label className="block text-[18px] font-bold text-[#1b3a24]">
                패키지 옵션 선택
              </label>

              {productOptions.map((opt) => {
                const isSelected = selectedOptionId === opt.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => setSelectedOptionId(opt.id)}
                    className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                      isSelected
                        ? 'border-[#2c5e3b] bg-[#e5ece5]/40 shadow-sm'
                        : 'border-[#e9e1d0] bg-[#fbf9f5] hover:border-[#b3c7b3]'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="product-option"
                          checked={isSelected}
                          onChange={() => setSelectedOptionId(opt.id)}
                          className="w-5 h-5 accent-[#2c5e3b] cursor-pointer"
                        />
                        <div>
                          <div className="text-[19px] font-bold text-[#1b3a24] flex items-center gap-2">
                            <span>{opt.name}</span>
                            {opt.popular && (
                              <span className="text-xs font-extrabold bg-[#2c5e3b] text-white px-2 py-0.5 rounded-full">
                                인기 실속형
                              </span>
                            )}
                          </div>
                          <div className="text-[17px] text-[#5e584f] mt-0.5">
                            {opt.subtext}
                          </div>
                          {opt.bonus && (
                            <div className="text-[16px] text-[#2c5e3b] font-semibold mt-1 flex items-center gap-1.5">
                              <Gift className="w-4 h-4" />
                              <span>{opt.bonus}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="text-right shrink-0 ml-4">
                        <div className="text-[16px] text-stone-500 line-through">
                          {opt.originalPrice.toLocaleString()}원
                        </div>
                        <div className="text-2xl font-black text-[#2c5e3b] tabular-nums">
                          {opt.price.toLocaleString()}원
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quantity Stepper */}
            <div className="flex items-center justify-between py-4 border-y border-[#e9e1d0]">
              <span className="text-[19px] font-bold text-[#1b3a24]">수량 선택</span>
              <div className="flex items-center gap-3 bg-[#f5f0e6] p-1.5 rounded-2xl border border-[#e9e1d0]">
                <button
                  type="button"
                  onClick={handleDecrement}
                  disabled={quantity <= 1}
                  className="w-12 h-12 rounded-xl bg-white border border-[#d6caa5] flex items-center justify-center text-[#1b3a24] font-bold hover:bg-[#e5ece5] disabled:opacity-40 transition-colors"
                  aria-label="수량 감소"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="text-2xl font-bold text-[#1b3a24] px-4 tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={handleIncrement}
                  disabled={quantity >= 10}
                  className="w-12 h-12 rounded-xl bg-white border border-[#d6caa5] flex items-center justify-center text-[#1b3a24] font-bold hover:bg-[#e5ece5] disabled:opacity-40 transition-colors"
                  aria-label="수량 증가"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Total Price Summary */}
            <div className="bg-[#f5f0e6] p-6 rounded-2xl border border-[#e9e1d0] flex items-center justify-between">
              <div>
                <span className="text-[18px] text-[#5e584f]">총 결제 금액 (무료배송)</span>
                <div className="text-[16px] text-[#2c5e3b] font-medium">
                  {selectedOption.name} × {quantity}개
                </div>
              </div>
              <div className="text-3xl sm:text-4xl font-black text-[#1b3a24] tabular-nums">
                {totalPrice.toLocaleString()}
                <span className="text-2xl font-bold ml-1">원</span>
              </div>
            </div>

            {/* Big Order Button */}
            <div>
              <button
                type="button"
                onClick={() => onStartOrder(selectedOption, quantity)}
                className="w-full min-h-[58px] rounded-2xl bg-[#1b3a24] hover:bg-[#2c5e3b] text-white font-black text-[22px] tracking-wide transition-all shadow-md hover:shadow-xl flex items-center justify-center gap-3 active:scale-[0.99]"
              >
                <ShoppingBag className="w-6 h-6" />
                <span>주문서 작성하고 결제하기</span>
              </button>
              <div className="text-center text-[16px] text-[#5e584f] mt-3">
                ※ 모의 결제 시스템으로 진행되며 실제 금액은 청구되지 않습니다.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
