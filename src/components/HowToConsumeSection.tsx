import React from 'react';
import { Droplet, PackagePlus, RefreshCw, Lightbulb } from 'lucide-react';

export const HowToConsumeSection: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: '물 또는 우유 200ml 붓기',
      subtitle: '음료를 가루보다 먼저 넣는 것이 뭉치지 않는 핵심 비결입니다.',
      desc: '보틀 또는 텀블러에 물 200ml(기호에 따라 우유나 무가당 두유, 아몬드브리즈)를 먼저 채워주세요.',
      icon: Droplet,
      tip: '찬물에도 잘 풀리는 미세 입자 분말입니다.',
    },
    {
      step: '02',
      title: '순수생식 1포(40g) 넣기',
      subtitle: '이지컷(Easy-Cut) 포장으로 가위 없이 어디서나 쉽게 개봉합니다.',
      desc: '하루채움 순수생식 1포를 뜯어 보틀에 담아줍니다. 1포에 50종 자연 원물이 알차게 들어있습니다.',
      icon: PackagePlus,
      tip: '취향에 따라 꿀 반 스푼을 곁들이셔도 좋습니다.',
    },
    {
      step: '03',
      title: '가볍게 흔들어 천천히 마시기',
      subtitle: '뚜껑을 닫고 5~10초간 상하로 가볍게 흔들어 주시면 완성됩니다.',
      desc: '빨리 마시기보다는 꼭꼭 씹듯이 천천히 드시면 통곡물과 원물의 고소한 풍미를 온전히 즐기실 수 있습니다.',
      icon: RefreshCw,
      tip: '타서 둔 뒤 오래 두지 마시고 바로 드시는 것을 권장합니다.',
    },
  ];

  return (
    <section id="how-to" className="py-16 md:py-24 bg-[#fbf9f5] border-b border-[#e9e1d0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="max-w-3xl text-left space-y-4">
          <div className="text-[17px] font-semibold text-[#2c5e3b] tracking-wide">
            EASY 3-STEP GUIDE
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1b3a24] tracking-tight">
            물이나 우유에 타서 간편하게!
            <br />
            <span className="text-[#2c5e3b]">3단계 섭취 방법</span>
          </h2>
          <p className="text-[19px] sm:text-[20px] text-[#2d2a26] leading-relaxed">
            복잡한 준비 없이 텀블러 하나면 충분합니다. 누구나 1분 만에 든든하고 맑은 자연 한 끼를 완성하세요.
          </p>
        </div>

        {/* 3 Steps Process Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="bg-white rounded-3xl p-8 border-2 border-[#e9e1d0] relative shadow-sm hover:border-[#2c5e3b] transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Step Number Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-4xl font-black text-[#2c5e3b] tracking-tight">
                      STEP {item.step}
                    </span>
                    <div className="w-14 h-14 rounded-2xl bg-[#e5ece5] flex items-center justify-center text-[#2c5e3b]">
                      <Icon className="w-7 h-7" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-[#1b3a24] leading-snug">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-[17px] text-[#2c5e3b] font-semibold">
                    {item.subtitle}
                  </p>

                  <p className="mt-3 text-[18px] text-[#4d4841] leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#f5f0e6] bg-[#fbf9f5] -mx-4 -mb-4 p-4 rounded-2xl flex items-start gap-2.5">
                  <Lightbulb className="w-5 h-5 text-[#2c5e3b] shrink-0 mt-0.5" />
                  <span className="text-[16px] text-[#5e584f]">
                    {item.tip}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pairing Recommendation Box */}
        <div className="mt-12 bg-[#f5f0e6] rounded-3xl p-6 sm:p-8 border-2 border-[#e9e1d0]">
          <h4 className="text-2xl font-bold text-[#1b3a24] mb-3">
            더 맛있게 즐기는 3가지 음료 궁합
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-[18px]">
            <div className="bg-white p-4 rounded-2xl border border-[#d6caa5]">
              <div className="font-bold text-[#1b3a24] text-[19px]">생수 200ml</div>
              <div className="text-[17px] text-[#5e584f] mt-1">
                50종 원물 본연의 깔끔하고 개운한 맛을 가장 순수하게 느끼고 싶을 때
              </div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-[#d6caa5]">
              <div className="font-bold text-[#1b3a24] text-[19px]">우유 200ml</div>
              <div className="text-[17px] text-[#5e584f] mt-1">
                마치 미숫가루나 라떼처럼 부드럽고 더욱 고소하고 포만감 있는 한 끼
              </div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-[#d6caa5]">
              <div className="font-bold text-[#1b3a24] text-[19px]">무가당 두유 200ml</div>
              <div className="text-[17px] text-[#5e584f] mt-1">
                통곡물과 콩의 담백함이 어우러져 깊고 진한 식물성 고소함을 원할 때
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
