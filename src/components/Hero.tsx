import React from 'react';
import { ArrowRight, CheckCircle2, Sparkles, Sprout } from 'lucide-react';

interface HeroProps {
  onOrderClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOrderClick }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 bg-gradient-to-b from-[#f5f0e6]/70 via-[#fbf9f5] to-[#fbf9f5] border-b border-[#e9e1d0]">
      {/* Decorative subtle botanical background elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#e5ece5]/60 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-[#f5f0e6] blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines & Call to Action */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Pure food kicker */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-[#e5ece5] text-[#1b3a24] text-[16px] font-semibold tracking-wide">
              <Sprout className="w-4 h-4 text-[#2c5e3b]" />
              <span>100% 국내산 50종 자연 원물 동결건조</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1b3a24] tracking-tight leading-[1.18] text-balance">
              하루 한 잔,
              <br />
              <span className="text-[#2c5e3b] underline decoration-[#c5d8c5] decoration-wavy decoration-2 underline-offset-8">
                간편한 한 끼
              </span>
            </h1>

            {/* Subhead with strict compliance (whole food, raw ingredients, dietary fiber, wholesome meal) */}
            <p className="text-[20px] sm:text-[22px] text-[#2d2a26] leading-relaxed max-w-2xl font-normal">
              바쁜 아침에도 물이나 우유에 가볍게 흔들어 마시는 순수 생식.
              볶거나 열을 가하지 않고 영하 35도에서 원물 그대로 동결건조하여,
              통곡물과 녹색 채소의 자연 식이섬유와 영양을 한 포에 가득 담았습니다.
            </p>

            {/* Highlights row */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="flex items-center gap-2.5 text-[18px] text-[#234b2f] font-medium bg-[#f5f0e6] p-3 rounded-xl border border-[#e9e1d0]">
                <CheckCircle2 className="w-5 h-5 text-[#2c5e3b] shrink-0" />
                <span>국내산 원물 50종</span>
              </div>
              <div className="flex items-center gap-2.5 text-[18px] text-[#234b2f] font-medium bg-[#f5f0e6] p-3 rounded-xl border border-[#e9e1d0]">
                <CheckCircle2 className="w-5 h-5 text-[#2c5e3b] shrink-0" />
                <span>풍부한 자연 식이섬유</span>
              </div>
              <div className="flex items-center gap-2.5 text-[18px] text-[#234b2f] font-medium bg-[#f5f0e6] p-3 rounded-xl border border-[#e9e1d0]">
                <CheckCircle2 className="w-5 h-5 text-[#2c5e3b] shrink-0" />
                <span>합성첨가물 0%</span>
              </div>
            </div>

            {/* Big Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onOrderClick}
                type="button"
                className="min-h-[58px] px-8 py-3.5 rounded-2xl bg-[#1b3a24] hover:bg-[#2c5e3b] text-white text-[20px] font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-3 active:scale-[0.99]"
              >
                <span>지금 간편 주문하기</span>
                <ArrowRight className="w-6 h-6" />
              </button>

              <a
                href="#ingredients"
                className="min-h-[58px] px-6 py-3.5 rounded-2xl border-2 border-[#2c5e3b] bg-white hover:bg-[#f5f0e6] text-[#1b3a24] text-[19px] font-semibold transition-all flex items-center justify-center text-center"
              >
                50종 원물 자세히 보기
              </a>
            </div>

            <div className="text-[17px] text-[#5e584f] flex items-center gap-2 pt-1">
              <Sparkles className="w-4 h-4 text-[#2c5e3b]" />
              <span>평일 오후 2시 이전 주문 시 당일 우체국 택배 발송 (전국 무료배송)</span>
            </div>
          </div>

          {/* Right Column: Visual Showcase Art */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Card Container with natural organic aesthetic */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-[#e9e1d0] relative overflow-hidden">
                {/* SVG Visual Graphic */}
                <div className="w-full aspect-[4/3] rounded-2xl bg-gradient-to-br from-[#e5ece5] via-[#f5f0e6] to-[#fbf9f5] flex items-center justify-center p-6 border border-[#e9e1d0] relative">
                  <svg
                    viewBox="0 0 320 240"
                    className="w-full h-full max-h-56 drop-shadow-md"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Background Soft Circle */}
                    <circle cx="160" cy="120" r="90" fill="#d9e6d9" opacity="0.6" />

                    {/* Tumbler / Glass shaker */}
                    <path
                      d="M110 50 L100 190 Q100 205 120 205 L160 205 Q180 205 180 190 L170 50 Z"
                      fill="#ffffff"
                      stroke="#234b2f"
                      strokeWidth="3.5"
                    />
                    {/* Liquid fill in tumbler (green whole food shake) */}
                    <path
                      d="M106 100 L101 188 Q101 202 118 202 L162 202 Q179 202 179 188 L174 100 Q140 106 106 100 Z"
                      fill="#7da379"
                    />
                    {/* Tumbler measurement markings */}
                    <line x1="120" y1="130" x2="135" y2="130" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                    <line x1="120" y1="150" x2="140" y2="150" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                    <line x1="120" y1="170" x2="135" y2="170" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />

                    {/* Shaker Cap */}
                    <rect x="100" y="38" width="80" height="14" rx="4" fill="#2c5e3b" stroke="#1b3a24" strokeWidth="2" />
                    <rect x="125" y="24" width="30" height="16" rx="4" fill="#1b3a24" />

                    {/* Single Pouch next to tumbler */}
                    <g transform="translate(185, 80) rotate(12)">
                      <rect x="0" y="0" width="55" height="115" rx="5" fill="#f5f0e6" stroke="#234b2f" strokeWidth="2.5" />
                      <rect x="5" y="8" width="45" height="4" fill="#2c5e3b" />
                      <text x="28" y="45" fontSize="11" fontWeight="bold" fill="#1b3a24" textAnchor="middle">하루채움</text>
                      <text x="28" y="62" fontSize="9" fontWeight="600" fill="#2c5e3b" textAnchor="middle">순수생식</text>
                      <circle cx="28" cy="85" r="10" fill="#e5ece5" />
                      <path d="M25 88 C25 80 32 78 32 88" stroke="#234b2f" strokeWidth="1.5" />
                    </g>

                    {/* Natural green sprouts & grain stalks */}
                    <g transform="translate(60, 110)">
                      <path d="M20 90 Q30 50 15 20" stroke="#2c5e3b" strokeWidth="3" strokeLinecap="round" />
                      <ellipse cx="14" cy="22" rx="7" ry="12" fill="#7da379" transform="rotate(-30 14 22)" />
                      <ellipse cx="26" cy="42" rx="6" ry="10" fill="#9dbb9a" transform="rotate(35 26 42)" />
                      <ellipse cx="16" cy="62" rx="6" ry="10" fill="#7da379" transform="rotate(-35 16 62)" />
                    </g>

                    {/* Golden grain grains */}
                    <circle cx="240" cy="195" r="5" fill="#d6caa5" stroke="#a89a74" strokeWidth="1" />
                    <circle cx="252" cy="198" r="4.5" fill="#d6caa5" stroke="#a89a74" strokeWidth="1" />
                    <circle cx="245" cy="207" r="4" fill="#d6caa5" stroke="#a89a74" strokeWidth="1" />
                    <circle cx="85" cy="200" r="5" fill="#d6caa5" stroke="#a89a74" strokeWidth="1" />
                    <circle cx="75" cy="204" r="4.5" fill="#d6caa5" stroke="#a89a74" strokeWidth="1" />
                  </svg>
                </div>

                {/* Caption card content */}
                <div className="mt-5 space-y-2">
                  <div className="flex items-center justify-between text-[18px]">
                    <span className="font-bold text-[#1b3a24]">하루채움 순수생식 50</span>
                    <span className="font-extrabold text-[#2c5e3b] text-xl">48,000원</span>
                  </div>
                  <p className="text-[17px] text-[#5e584f] leading-normal">
                    국내산 50종 자연 원물 100% · 1박스 30포 (1개월분) · 전용 보틀 옵션 제공
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={onOrderClick}
                      type="button"
                      className="w-full min-h-[50px] rounded-xl bg-[#2c5e3b] hover:bg-[#1b3a24] text-white font-bold text-[18px] transition-colors"
                    >
                      주문서 작성하기
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
