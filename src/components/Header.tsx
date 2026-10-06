import React from 'react';
import { User } from '../types';
import { ShoppingBag, UserCheck, ShieldCheck, LogOut, Menu, X } from 'lucide-react';

interface HeaderProps {
  currentUser: User | null;
  onOpenAuth: () => void;
  onLogout: () => void;
  onOpenAdmin: () => void;
  onScrollToProduct: () => void;
  orderCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  onOpenAuth,
  onLogout,
  onOpenAdmin,
  onScrollToProduct,
  orderCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#fbf9f5]/95 backdrop-blur-md border-b border-[#e9e1d0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Zone 1: Single text element Brand wordmark */}
        <a
          href="#"
          className="text-2xl font-bold tracking-tight text-[#1b3a24] hover:text-[#2c5e3b] transition-colors whitespace-nowrap"
        >
          하루채움 순수생식
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-[18px] font-medium text-[#2d2a26]">
          <a
            href="#ingredients"
            className="hover:text-[#2c5e3b] transition-colors hover:underline underline-offset-8"
          >
            국내산 50종 원물
          </a>
          <a
            href="#recommendations"
            className="hover:text-[#2c5e3b] transition-colors hover:underline underline-offset-8"
          >
            이런 분께 추천
          </a>
          <a
            href="#how-to"
            className="hover:text-[#2c5e3b] transition-colors hover:underline underline-offset-8"
          >
            섭취 방법
          </a>
          <a
            href="#product"
            onClick={(e) => {
              e.preventDefault();
              onScrollToProduct();
            }}
            className="hover:text-[#2c5e3b] transition-colors hover:underline underline-offset-8"
          >
            상품 안내
          </a>
        </nav>

        {/* Zone 3: Actions */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Seller order management button */}
          <button
            onClick={onOpenAdmin}
            type="button"
            className="min-h-[48px] px-4 py-2.5 rounded-xl border border-[#2c5e3b] bg-[#e5ece5] text-[#1b3a24] font-semibold text-[17px] hover:bg-[#d6e3d6] transition-all flex items-center gap-2"
            title="판매자 실시간 주문 목록 보기"
          >
            <ShieldCheck className="w-5 h-5 text-[#2c5e3b]" />
            <span className="whitespace-nowrap">판매자 주문관리</span>
            <span className="inline-flex items-center justify-center bg-[#2c5e3b] text-white text-xs px-2 py-0.5 rounded-full font-bold">
              {orderCount}
            </span>
          </button>

          {/* User auth state */}
          {currentUser ? (
            <div className="flex items-center gap-2 bg-[#f5f0e6] px-3 py-1.5 rounded-xl border border-[#e9e1d0]">
              <span className="text-[17px] text-[#2d2a26] font-medium flex items-center gap-1.5">
                <UserCheck className="w-5 h-5 text-[#2c5e3b]" />
                {currentUser.name} 님
              </span>
              <button
                onClick={onLogout}
                type="button"
                className="text-stone-600 hover:text-red-700 p-1.5 ml-1 transition-colors"
                title="로그아웃"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              type="button"
              className="min-h-[48px] px-4 py-2.5 rounded-xl border border-[#d6caa5] bg-white text-[#2d2a26] font-semibold text-[17px] hover:bg-[#f5f0e6] transition-colors whitespace-nowrap"
            >
              로그인 / 회원가입
            </button>
          )}

          {/* Direct Buy CTA */}
          <button
            onClick={onScrollToProduct}
            type="button"
            className="min-h-[48px] px-5 py-2.5 rounded-xl bg-[#2c5e3b] hover:bg-[#1b3a24] text-white font-bold text-[18px] transition-all shadow-sm flex items-center gap-2 whitespace-nowrap"
          >
            <ShoppingBag className="w-5 h-5" />
            <span>주문하기</span>
          </button>
        </div>

        {/* Mobile menu hamburger */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onOpenAdmin}
            type="button"
            className="min-h-[44px] px-3 py-1.5 rounded-lg bg-[#e5ece5] text-[#1b3a24] font-medium text-sm flex items-center gap-1"
          >
            <ShieldCheck className="w-4 h-4 text-[#2c5e3b]" />
            관리
            <span className="bg-[#2c5e3b] text-white text-[11px] px-1.5 rounded-full font-bold">
              {orderCount}
            </span>
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            className="p-2 text-[#2d2a26] rounded-lg hover:bg-[#f5f0e6]"
            aria-label="메뉴 열기"
          >
            {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-[#e9e1d0] bg-[#fbf9f5] px-4 py-5 space-y-4 shadow-lg">
          <nav className="flex flex-col space-y-3 text-[18px] font-medium text-[#2d2a26]">
            <a
              href="#ingredients"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-[#2c5e3b]"
            >
              국내산 50종 원물
            </a>
            <a
              href="#recommendations"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-[#2c5e3b]"
            >
              이런 분께 추천
            </a>
            <a
              href="#how-to"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-[#2c5e3b]"
            >
              섭취 방법
            </a>
            <a
              href="#product"
              onClick={() => {
                setMobileMenuOpen(false);
                onScrollToProduct();
              }}
              className="py-2 hover:text-[#2c5e3b]"
            >
              상품 안내 및 주문
            </a>
          </nav>
          <div className="pt-3 border-t border-[#e9e1d0] flex flex-col gap-2">
            {currentUser ? (
              <div className="flex items-center justify-between py-2 text-[18px]">
                <span className="font-semibold text-[#1b3a24]">
                  {currentUser.name} 님 로그인됨
                </span>
                <button
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-stone-600 underline text-sm"
                >
                  로그아웃
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  onOpenAuth();
                  setMobileMenuOpen(false);
                }}
                className="w-full min-h-[48px] rounded-xl border border-[#d6caa5] bg-white text-[#2d2a26] font-semibold text-[18px]"
              >
                로그인 / 회원가입
              </button>
            )}
            <button
              onClick={() => {
                onScrollToProduct();
                setMobileMenuOpen(false);
              }}
              className="w-full min-h-[48px] rounded-xl bg-[#2c5e3b] text-white font-bold text-[18px]"
            >
              간편 주문하기
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
