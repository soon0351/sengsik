import React, { useState } from 'react';
import { User } from '../types';
import { apiLogin, apiRegister, apiResetPassword } from '../lib/api';
import {
  X,
  Lock,
  Mail,
  User as UserIcon,
  Phone,
  MapPin,
  Sparkles,
  LogIn,
  UserPlus,
  AlertCircle,
  KeyRound,
  CheckCircle2,
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onAuthSuccess }) => {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  // Smart resolution states
  const [errorMessage, setErrorMessage] = useState('');
  const [isNotRegisteredError, setIsNotRegisteredError] = useState(false);
  const [isPasswordMismatchError, setIsPasswordMismatchError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setIsNotRegisteredError(false);
    setIsPasswordMismatchError(false);

    try {
      const data = isRegisterMode
        ? await apiRegister({ email, password, name, phone, address })
        : await apiLogin({ email, password });

      if (!data || !data.success) {
        if (data?.notRegistered) {
          setIsNotRegisteredError(true);
        } else if (data?.passwordMismatch) {
          setIsPasswordMismatchError(true);
        }
        throw new Error(data?.error || '인증 처리에 실패했습니다.');
      }

      onAuthSuccess(data.user);
      onClose();
    } catch (err: any) {
      setErrorMessage(err.message || '로그인 또는 회원가입 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // Instant 1-Click Register & Login with the current entered email & password
  const handleQuickRegisterAndLogin = async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      const data = await apiLogin({ email, password, autoRegisterIfNew: true });
      if (data && data.success && data.user) {
        onAuthSuccess(data.user);
        onClose();
      } else {
        throw new Error(data?.error || '가입 처리에 실패했습니다.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || '가입 처리 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // Instant 1-Click Password Reset with the current entered password
  const handleQuickPasswordReset = async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      const data = await apiResetPassword({ email, newPassword: password });
      if (data && data.success && data.user) {
        onAuthSuccess(data.user);
        onClose();
      } else {
        throw new Error(data?.error || '비밀번호 재설정 실패');
      }
    } catch (err: any) {
      setErrorMessage(err.message || '비밀번호 변경 처리 실패');
    } finally {
      setLoading(false);
    }
  };

  // Fast Demo Login
  const handleDemoLogin = async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      const data = await apiLogin({ email: 'demo@haruchaeum.kr', password: 'password123' });
      if (data && data.success && data.user) {
        onAuthSuccess(data.user);
        onClose();
      } else {
        const demoUser: User = {
          id: 'demo-user',
          email: 'demo@haruchaeum.kr',
          name: '홍길동',
          phone: '010-1234-5678',
          address: '서울특별시 마포구 월드컵북로 12',
        };
        onAuthSuccess(demoUser);
        onClose();
      }
    } catch {
      const demoUser: User = {
        id: 'demo-user',
        email: 'demo@haruchaeum.kr',
        name: '홍길동',
        phone: '010-1234-5678',
        address: '서울특별시 마포구 월드컵북로 12',
      };
      onAuthSuccess(demoUser);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#fbf9f5] w-full max-w-lg rounded-3xl border-2 border-[#e9e1d0] shadow-2xl overflow-hidden my-8">
        {/* Header with Mode Tabs */}
        <div className="bg-[#f5f0e6] px-6 py-4 border-b border-[#e9e1d0] flex items-center justify-between">
          <div className="flex items-center gap-1 bg-[#e5ece5] p-1 rounded-xl">
            <button
              type="button"
              onClick={() => {
                setIsRegisterMode(false);
                setErrorMessage('');
                setIsNotRegisteredError(false);
                setIsPasswordMismatchError(false);
              }}
              className={`px-4 py-2 rounded-lg text-[17px] font-bold transition-all ${
                !isRegisterMode
                  ? 'bg-white text-[#1b3a24] shadow-sm'
                  : 'text-[#4d4841] hover:text-[#1b3a24]'
              }`}
            >
              로그인
            </button>
            <button
              type="button"
              onClick={() => {
                setIsRegisterMode(true);
                setErrorMessage('');
                setIsNotRegisteredError(false);
                setIsPasswordMismatchError(false);
              }}
              className={`px-4 py-2 rounded-lg text-[17px] font-bold transition-all ${
                isRegisterMode
                  ? 'bg-white text-[#1b3a24] shadow-sm'
                  : 'text-[#4d4841] hover:text-[#1b3a24]'
              }`}
            >
              회원가입
            </button>
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

        <div className="p-6 sm:p-8 space-y-6">
          {/* Quick Demo Login Option */}
          <button
            type="button"
            onClick={handleDemoLogin}
            disabled={loading}
            className="w-full min-h-[50px] p-3 rounded-2xl bg-[#e5ece5] border-2 border-[#2c5e3b] text-[#1b3a24] font-bold text-[18px] hover:bg-[#d6e3d6] transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <Sparkles className="w-5 h-5 text-[#2c5e3b]" />
            <span>데모 계정으로 1초 빠른 로그인</span>
          </button>

          <div className="flex items-center gap-3 text-stone-500 text-[15px]">
            <div className="h-px bg-[#e9e1d0] flex-1" />
            <span>또는 {isRegisterMode ? '정보 입력하여 가입' : '직접 이메일 로그인'}</span>
            <div className="h-px bg-[#e9e1d0] flex-1" />
          </div>

          {/* Smart Resolution Card 1: Unregistered Email */}
          {isNotRegisteredError && (
            <div className="p-5 rounded-2xl bg-amber-50 border-2 border-amber-400 space-y-3">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <div className="text-[18px] font-bold text-amber-950">
                    아직 가입되지 않은 이메일입니다!
                  </div>
                  <div className="text-[16px] text-amber-800 mt-0.5">
                    <strong>{email}</strong> 계정으로 지금 바로 회원가입하시겠습니까?
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleQuickRegisterAndLogin}
                disabled={loading}
                className="w-full min-h-[48px] rounded-xl bg-[#2c5e3b] hover:bg-[#1b3a24] text-white font-bold text-[17px] flex items-center justify-center gap-2 shadow transition-colors"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>이 정보로 지금 즉시 가입 & 로그인하기</span>
              </button>
            </div>
          )}

          {/* Smart Resolution Card 2: Password Mismatch */}
          {isPasswordMismatchError && (
            <div className="p-5 rounded-2xl bg-orange-50 border-2 border-orange-400 space-y-3">
              <div className="flex items-start gap-2.5">
                <KeyRound className="w-6 h-6 text-orange-700 shrink-0 mt-0.5" />
                <div>
                  <div className="text-[18px] font-bold text-orange-950">
                    비밀번호가 일치하지 않습니다
                  </div>
                  <div className="text-[16px] text-orange-800 mt-0.5">
                    비밀번호를 다시 확인하시거나, 지금 입력하신 새 비밀번호로 바로 갱신할 수 있습니다.
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleQuickPasswordReset}
                disabled={loading}
                className="w-full min-h-[48px] rounded-xl bg-orange-700 hover:bg-orange-800 text-white font-bold text-[17px] flex items-center justify-center gap-2 shadow transition-colors"
              >
                <KeyRound className="w-5 h-5" />
                <span>입력한 비밀번호로 바로 갱신하고 로그인</span>
              </button>
            </div>
          )}

          {/* General Error (if not the smart cards) */}
          {errorMessage && !isNotRegisteredError && !isPasswordMismatchError && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-300 text-red-800 text-[17px] font-medium flex items-center gap-2">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* If Register: Name */}
            {isRegisterMode && (
              <div>
                <label className="block text-[18px] font-bold text-[#1b3a24] mb-1.5">
                  이름 (닉네임)
                </label>
                <div className="relative">
                  <UserIcon className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="성함 (미입력 시 이메일 아이디 사용)"
                    className="w-full min-h-[50px] pl-12 pr-4 rounded-xl border-2 border-[#d6caa5] bg-white text-[18px] text-[#2d2a26] focus:border-[#2c5e3b]"
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-[18px] font-bold text-[#1b3a24] mb-1.5">
                이메일 주소 <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setIsNotRegisteredError(false);
                    setIsPasswordMismatchError(false);
                  }}
                  placeholder="name@example.com"
                  className="w-full min-h-[50px] pl-12 pr-4 rounded-xl border-2 border-[#d6caa5] bg-white text-[18px] text-[#2d2a26] focus:border-[#2c5e3b]"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[18px] font-bold text-[#1b3a24]">
                  비밀번호 <span className="text-red-600">*</span>
                </label>
                {!isRegisterMode && (
                  <button
                    type="button"
                    onClick={handleQuickPasswordReset}
                    className="text-[15px] text-[#2c5e3b] font-medium underline"
                  >
                    비밀번호 재설정
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setIsPasswordMismatchError(false);
                  }}
                  placeholder="비밀번호 입력"
                  className="w-full min-h-[50px] pl-12 pr-4 rounded-xl border-2 border-[#d6caa5] bg-white text-[18px] text-[#2d2a26] focus:border-[#2c5e3b]"
                />
              </div>
            </div>

            {/* If Register: Phone & Address */}
            {isRegisterMode && (
              <>
                <div>
                  <label className="block text-[18px] font-bold text-[#1b3a24] mb-1.5">
                    연락처 (선택)
                  </label>
                  <div className="relative">
                    <Phone className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="010-0000-0000"
                      className="w-full min-h-[50px] pl-12 pr-4 rounded-xl border-2 border-[#d6caa5] bg-white text-[18px] text-[#2d2a26] focus:border-[#2c5e3b]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[18px] font-bold text-[#1b3a24] mb-1.5">
                    기본 배송지 주소 (선택)
                  </label>
                  <div className="relative">
                    <MapPin className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="주문 시 자동 입력됩니다"
                      className="w-full min-h-[50px] pl-12 pr-4 rounded-xl border-2 border-[#d6caa5] bg-white text-[18px] text-[#2d2a26] focus:border-[#2c5e3b]"
                    />
                  </div>
                </div>
              </>
            )}

            <div className="pt-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full min-h-[54px] rounded-2xl bg-[#1b3a24] hover:bg-[#2c5e3b] text-white font-bold text-[20px] transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
              >
                {isRegisterMode ? (
                  <>
                    <UserPlus className="w-5 h-5" />
                    <span>회원가입 완료하기</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    <span>로그인하기</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Toggle Register / Login */}
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => {
                setIsRegisterMode(!isRegisterMode);
                setErrorMessage('');
                setIsNotRegisteredError(false);
                setIsPasswordMismatchError(false);
              }}
              className="text-[17px] text-[#2c5e3b] font-semibold underline hover:text-[#1b3a24]"
            >
              {isRegisterMode
                ? '이미 계정이 있으신가요? 로그인 화면으로 가기'
                : '아직 계정이 없으신가요? [회원가입] 진행하기'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
