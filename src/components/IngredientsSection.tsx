import React from 'react';
import { Wheat, Leaf, Apple, Waves, Snowflake, CheckCircle } from 'lucide-react';

export const IngredientsSection: React.FC = () => {
  const ingredientGroups = [
    {
      title: '통곡물류 15종',
      count: '15종',
      icon: Wheat,
      description: '껍질째 갈아 담은 통곡물로 씹을수록 구수하고 든든한 식이섬유 공급원',
      items: [
        '현미', '발아현미', '찰흑미', '율무', '찰보리',
        '귀리', '메밀', '수수', '조', '기장',
        '서리태(검은콩)', '백태', '흑임자(검은깨)', '참깨', '팥'
      ],
    },
    {
      title: '녹황색 채소·뿌리채소 18종',
      count: '18종',
      icon: Leaf,
      description: '푸른 밭의 신선함을 동결건조하여 영양 손실 없이 담아낸 자연 채소',
      items: [
        '케일', '신선초', '시금치', '브로콜리', '양배추',
        '당근', '단호박', '연근', '우엉', '마',
        '비트', '양파', '토마토', '미나리', '더덕',
        '도라지', '무', '무청'
      ],
    },
    {
      title: '국내산 제철 과일류 7종',
      count: '7종',
      icon: Apple,
      description: '자연의 은은한 단맛과 산뜻함을 더해주는 비가열 건조 과일 원물',
      items: ['사과', '배', '감', '유자', '매실', '모과', '복분자'],
    },
    {
      title: '해조류 및 버섯류 10종',
      count: '10종',
      icon: Waves,
      description: '깊은 바다와 숲에서 자란 미네랄과 식물성 식이섬유 원물',
      items: [
        '다시마', '미역', '김', '톳', '파래',
        '표고버섯', '영지버섯', '느타리버섯', '팽이버섯', '목이버섯'
      ],
    },
  ];

  return (
    <section id="ingredients" className="py-16 md:py-24 bg-[#fbf9f5] border-b border-[#e9e1d0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl text-left space-y-4">
          <div className="text-[17px] font-semibold text-[#2c5e3b] tracking-wide">
            PURE DOMESTIC RAW WHOLE FOODS
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1b3a24] tracking-tight">
            땅과 바다가 키운
            <br />
            <span className="text-[#2c5e3b]">국내산 50종 자연 원물</span> 그대로
          </h2>
          <p className="text-[19px] sm:text-[20px] text-[#2d2a26] leading-relaxed">
            하루채움 순수생식은 단 하나의 수입 원료도 섞지 않고,
            대한민국 청정 산지에서 수확한 통곡물, 신선한 채소, 과일, 해조류 50종만을 엄선하여 담았습니다.
            가열 조리하지 않아 원물 본래의 풍부한 식이섬유를 간편하게 섭취할 수 있습니다.
          </p>
        </div>

        {/* Freeze-Drying Technology Highlight Card */}
        <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-[#f5f0e6] border-2 border-[#e9e1d0] grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-3">
            <div className="inline-flex items-center gap-2 text-[#1b3a24] font-bold text-[18px]">
              <Snowflake className="w-5 h-5 text-[#2c5e3b]" />
              <span>영하 35℃ 비가열 동결건조(FD) 공법 원리</span>
            </div>
            <p className="text-[18px] text-[#2d2a26] leading-relaxed">
              일반 분말 제품처럼 고열로 볶거나 찌지 않습니다. 수확 직후의 신선한 원물을 영하 35도 이하에서
              급속 동결한 후 진공 상태에서 수분만 승화시키는 방식을 사용하여,
              자연 원물의 본래 색상과 고유의 풍미, 자연 식이섬유 구조를 고스란히 지켜냅니다.
            </p>
          </div>
          <div className="md:col-span-4 bg-white p-5 rounded-2xl border border-[#d6caa5] space-y-2 text-center md:text-left">
            <div className="text-[16px] text-[#5e584f]">원재료 및 함량</div>
            <div className="text-2xl font-extrabold text-[#1b3a24]">국내산 100%</div>
            <div className="text-[16px] text-[#2c5e3b] font-semibold">보존료 · 인공감미료 · 착색료 무첨가</div>
          </div>
        </div>

        {/* 4 Category Groups Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {ingredientGroups.map((group) => {
            const IconComponent = group.icon;
            return (
              <div
                key={group.title}
                className="bg-white rounded-3xl p-7 border-2 border-[#e9e1d0] shadow-sm hover:border-[#2c5e3b] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-[#e9e1d0]">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#e5ece5] flex items-center justify-center text-[#2c5e3b]">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <h3 className="text-2xl font-bold text-[#1b3a24]">
                        {group.title}
                      </h3>
                    </div>
                    <span className="text-[17px] font-bold text-[#2c5e3b] bg-[#e5ece5] px-3 py-1 rounded-lg">
                      {group.count}
                    </span>
                  </div>

                  <p className="mt-4 text-[18px] text-[#4d4841] leading-relaxed">
                    {group.description}
                  </p>

                  {/* List of Ingredients */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="text-[17px] bg-[#fbf9f5] border border-[#e9e1d0] text-[#2d2a26] px-3 py-1.5 rounded-lg font-medium"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#f5f0e6] flex items-center gap-2 text-[16px] text-[#5e584f]">
                  <CheckCircle className="w-4 h-4 text-[#2c5e3b]" />
                  <span>전 원료 잔류농약 및 중금속 검사 적합 원료만 사용</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
