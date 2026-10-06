import React from 'react';
import { Phone, Mail, Clock, ShieldAlert, Sparkles, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#f5f0e6] border-t-2 border-[#e9e1d0] pt-16 pb-12 text-[#2d2a26]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#e9e1d0]">
          {/* Brand & Mission Statement */}
          <div className="md:col-span-5 space-y-4">
            <h3 className="text-3xl font-extrabold text-[#1b3a24] tracking-tight">
              하루채움 순수생식
            </h3>
            <p className="text-[18px] text-[#4d4841] leading-relaxed">
              정직한 국내산 50종 자연 원물을 비가열 동결건조하여 담아냈습니다.
              바쁜 일상 속에서도 자연 본연의 식이섬유와 통곡물의 든든함을 손쉽게 채우실 수 있도록
              가장 순수한 한 끼를 연구합니다.
            </p>
            <div className="text-[17px] text-[#2c5e3b] font-semibold flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              <span>자연을 있는 그대로, 하루 한 잔의 맑은 습관</span>
            </div>
          </div>

          {/* Customer Service & Contact Info */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-2xl font-bold text-[#1b3a24]">고객만족센터</h4>
            <div className="flex items-center gap-3 text-3xl font-black text-[#2c5e3b] tabular-nums">
              <Phone className="w-7 h-7" />
              <span>1588-5023</span>
            </div>
            <div className="space-y-1 text-[17px] text-[#5e584f]">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#2c5e3b]" />
                <span>운영시간: 평일 09:30 ~ 17:30 (점심시간 12:00 ~ 13:00)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#2c5e3b]" />
                <span>이메일 문의: cs@haruchaeum.kr</span>
              </div>
              <div>휴무: 토·일요일 및 법정 공휴일 휴무</div>
              <div className="pt-2 text-[16px] text-[#2d2a26]">
                <strong>반품/교환 안내:</strong> 신선식품 특성상 제품 하자 시 100% 무료 교환/환불 (수령 후 7일 이내)
              </div>
            </div>
          </div>

          {/* Business details */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xl font-bold text-[#1b3a24]">사업장 안내</h4>
            <div className="text-[16px] text-[#5e584f] space-y-1.5 leading-relaxed">
              <div className="flex items-start gap-1.5">
                <MapPin className="w-4 h-4 text-[#2c5e3b] shrink-0 mt-1" />
                <span>서울특별시 마포구 월드컵북로 12, 하루채움 빌딩 4층</span>
              </div>
              <div>상호: (주)하루채움바이오</div>
              <div>대표이사: 박도현</div>
              <div>사업자등록번호: 214-88-91024</div>
              <div>통신판매업신고: 2026-서울마포-1042호</div>
              <div>식품유통전문판매업신고 완료</div>
            </div>
          </div>
        </div>

        {/* Required Food Regulations Disclaimer */}
        <div className="mt-8 p-5 rounded-2xl bg-[#fbf9f5] border border-[#e9e1d0] text-[16px] text-[#5e584f] space-y-2">
          <div className="flex items-center gap-2 font-bold text-[#1b3a24] text-[17px]">
            <ShieldAlert className="w-5 h-5 text-[#2c5e3b]" />
            <span>식품 등의 표시·광고에 관한 법률 준수 안내</span>
          </div>
          <p className="leading-relaxed">
            본 제품은 50종의 국내산 곡류, 채소류, 과일류, 해조류 등을 원료로 한 <strong>일반식품(생식함유제품)</strong>입니다.
            질병의 예방 및 치료를 위한 의약품이나 건강기능식품이 아니며,
            일상에서 자연 식이섬유와 통곡물 영양을 간편하게 섭취하는 식사 대용 식품입니다.
          </p>
        </div>

        {/* Bottom copyright */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-[16px] text-stone-500 gap-2">
          <div>© 2026 HaruChaeum Saengsik. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <span className="hover:underline cursor-pointer">이용약관</span>
            <span>·</span>
            <span className="hover:underline cursor-pointer">개인정보처리방침</span>
            <span>·</span>
            <span className="hover:underline cursor-pointer">전자상거래 표준약관</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
