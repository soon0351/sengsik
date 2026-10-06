import React from 'react';
import { SunMedium, Salad, Sparkles, Check } from 'lucide-react';

export const TargetAudienceSection: React.FC = () => {
  const cards = [
    {
      icon: SunMedium,
      title: '바쁜 출근길, 아침 식사를 자주 거르시는 분',
      subtext: '1분 만에 가볍게 흔들어 마시는 든든한 통곡물 한 끼',
      details: [
        '복잡한 조리 없이 보틀에 물과 함께 1분 완성',
        '통곡물의 든든함으로 점심시간까지 편안한 포만감',
        '개별 파우치 포장으로 가방 속에 쏙 들어가는 간편함',
      ],
      tag: '간편한 아침 대용',
    },
    {
      icon: Salad,
      title: '평소 채소와 자연 식이섬유 섭취가 부족하신 분',
      subtext: '50종 원물이 제공하는 풍부한 식물성 식이섬유',
      details: [
        '녹황색 잎채소와 뿌리채소 18종의 영양을 한 잔에',
        '껍질째 보존된 통곡물 15종의 풍부한 자연 식이섬유',
        '인스턴트 식단으로 무거워진 일상에 맑은 식물성 영양',
      ],
      tag: '자연 식이섬유 보충',
    },
    {
      icon: Sparkles,
      title: '잦은 외식이나 야식 후, 담백한 식단이 필요하신 분',
      subtext: '자연 그대로의 원물로 채우는 속 편한 한 잔',
      details: [
        '자극적인 양념과 설탕 없이 구수한 곡물 본연의 맛',
        '부담 없이 가볍게 비우고 채우는 저녁 식사 대용',
        '가공식품 섭취를 줄이고 자연식으로 전환하고 싶을 때',
      ],
      tag: '담백하고 가벼운 식단',
    },
  ];

  return (
    <section id="recommendations" className="py-16 md:py-24 bg-[#f5f0e6]/60 border-b border-[#e9e1d0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="max-w-3xl text-left space-y-4">
          <div className="text-[17px] font-semibold text-[#2c5e3b] tracking-wide">
            RECOMMENDED FOR YOU
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1b3a24] tracking-tight">
            하루채움 순수생식,
            <br />
            <span className="text-[#2c5e3b]">이런 분께 추천</span>합니다
          </h2>
          <p className="text-[19px] sm:text-[20px] text-[#2d2a26] leading-relaxed">
            자연을 훼손하지 않은 온전한 50가지 원물로 만들어,
            바쁜 현대인의 일상에서 누구나 편안하고 손쉽게 건강한 식사 습관을 만들 수 있습니다.
          </p>
        </div>

        {/* 3 Cards Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-8 border-2 border-[#e9e1d0] shadow-sm hover:border-[#2c5e3b] hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Category tag */}
                  <div className="text-[16px] font-bold text-[#2c5e3b] tracking-wide mb-3">
                    {card.tag}
                  </div>

                  {/* Icon badge */}
                  <div className="w-14 h-14 rounded-2xl bg-[#e5ece5] flex items-center justify-center text-[#2c5e3b] mb-6">
                    <Icon className="w-8 h-8" />
                  </div>

                  {/* Card Title */}
                  <h3 className="text-2xl font-bold text-[#1b3a24] leading-snug">
                    {card.title}
                  </h3>

                  {/* Subtext */}
                  <p className="mt-3 text-[18px] text-[#5e584f] font-medium leading-relaxed">
                    {card.subtext}
                  </p>

                  {/* Bullet Points */}
                  <ul className="mt-6 space-y-3 pt-6 border-t border-[#f5f0e6]">
                    {card.details.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2.5 text-[17px] text-[#2d2a26]">
                        <Check className="w-5 h-5 text-[#2c5e3b] shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4 text-[16px] text-[#7a746a] font-medium">
                  {idx === 0 && '01 · 아침을 거르는 직장인과 학생'}
                  {idx === 1 && '02 · 불규칙한 식사의 현대인'}
                  {idx === 2 && '03 · 자연 그대로를 원하는 온 가족'}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
