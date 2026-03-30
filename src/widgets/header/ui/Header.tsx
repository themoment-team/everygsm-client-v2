'use client';

import { useRef, useState } from 'react';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { useQueryClient } from '@tanstack/react-query';

import { useGetUserInfo, UserInfoResponseType } from '@/entities/auth';
import { ArrowIcon, Logo, PersonIcon } from '@/shared/assets';
import { COOKIE_KEYS, OAUTH_SESSION_KEYS } from '@/shared/constants';
import { useOnClickOutside } from '@/shared/hooks';
import {
  cn,
  createAuthorizeUrl,
  deleteCookie,
  generateCodeChallenge,
  generateCodeVerifier,
  getCookie,
} from '@/shared/utils';

import { NAV_LINKS } from '../model/navigation';

interface HeaderProps {
  initialUserInfoData: UserInfoResponseType | undefined;
}

const EXCLUDED_ROUTES = ['/callback'];

const formatStudentSummary = (studentNumber?: string | null): string => {
  if (!studentNumber) {
    return '학번 정보 없음';
  }

  const normalizedStudentNumber = studentNumber.trim();

  if (!/^\d{4}$/.test(normalizedStudentNumber)) {
    return normalizedStudentNumber;
  }

  const grade = Number(normalizedStudentNumber[0]);
  const classNum = Number(normalizedStudentNumber[1]);
  const number = Number(normalizedStudentNumber.slice(2));

  return `${grade}학년 ${classNum}반 ${number}번`;
};

const Header = ({ initialUserInfoData }: HeaderProps) => {
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();
  const hasAccessToken = Boolean(getCookie(COOKIE_KEYS.ACCESS_TOKEN));

  const { data: userInfoData } = useGetUserInfo({
    initialData: initialUserInfoData,
    enabled: hasAccessToken,
  });

  useOnClickOutside(menuRef as React.RefObject<HTMLElement>, () => setIsOpen(false));

  const userInfo = userInfoData?.data;
  const role = userInfo?.role === 'ADMIN' ? 'admin' : 'client';
  const links = NAV_LINKS[role];
  const displayName = userInfo?.name ?? '사용자';
  const studentSummary = formatStudentSummary(userInfo?.studentNumber);

  const handleLogin = async () => {
    try {
      setIsLoginLoading(true);

      const clientId = process.env.NEXT_PUBLIC_DATAGSM_OAUTH_CLIENT_ID;
      const redirectUri = `${window.location.origin}/callback`;

      if (!clientId) {
        throw new Error('OAuth 환경 변수가 설정되지 않았습니다.');
      }

      const state = crypto.randomUUID();
      const codeVerifier = generateCodeVerifier();
      const codeChallenge = await generateCodeChallenge(codeVerifier);

      sessionStorage.setItem(OAUTH_SESSION_KEYS.STATE, state);
      sessionStorage.setItem(OAUTH_SESSION_KEYS.CODE_VERIFIER, codeVerifier);

      const authorizeUrl = createAuthorizeUrl({
        clientId,
        redirectUri,
        state,
        codeChallenge,
      });

      window.location.href = authorizeUrl;
    } catch (error) {
      setIsLoginLoading(false);
      console.error('OAuth 로그인 시작 실패:', error);
    }
  };

  const handleLogout = () => {
    setIsOpen(false);
    deleteCookie(COOKIE_KEYS.ACCESS_TOKEN);
    queryClient.clear();
    router.replace('/');
  };

  const handleToggleMenu = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  if (EXCLUDED_ROUTES.includes(pathname)) {
    return null;
  }

  return (
    <header
      className={cn('sticky top-0 z-50 flex h-18 items-center justify-between bg-[#191919] px-10')}
    >
      <Link href="/">
        <Logo />
      </Link>
      {!hasAccessToken && !userInfo ? (
        <button
          className={cn(
            'flex h-9 w-18.25 cursor-pointer items-center justify-center rounded-[1.125rem] border border-[#FC335A] text-base font-semibold text-[#FC335A]',
          )}
          onClick={() => void handleLogin()}
          disabled={isLoginLoading}
        >
          로그인
        </button>
      ) : (
        <div className={cn('flex items-center gap-14')}>
          <nav className={cn('flex items-center gap-14')}>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'rounded-full px-4 py-2 text-base font-medium text-white',
                  pathname === link.href && 'bg-[#2B2B2B]',
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div ref={menuRef}>
            <button
              className={cn('flex cursor-pointer items-center gap-2')}
              onClick={handleToggleMenu}
            >
              <span className={cn('text-base font-semibold text-[#FC335A]')}>{displayName}</span>
              <PersonIcon />
            </button>
            {isOpen && (
              <div
                className={cn(
                  'absolute top-9 right-14 flex w-full max-w-60 flex-col items-end gap-2 rounded-xl border border-[#2F2F2F] bg-[rgba(34,34,34,0.5)] p-6 backdrop-blur-[18px]',
                )}
              >
                <div className={cn('flex w-full flex-col gap-2')}>
                  <span className={cn('text-2xl/tight font-semibold text-white')}>
                    {displayName}
                  </span>
                  <span className={cn('text-sm/none font-medium text-[#9A9A9A]')}>
                    {studentSummary}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className={cn('flex cursor-pointer items-center justify-end gap-4 px-3 py-1.5')}
                >
                  <span className={cn('text-base font-medium text-white')}>로그아웃</span>
                  <ArrowIcon />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
