'use client';

import { Suspense, useEffect, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { usePostSignIn } from '@/entities/auth';
import { COOKIE_KEYS, OAUTH_SESSION_KEYS } from '@/shared/constants';
import { cn, setCookie } from '@/shared/utils';

const CallbackContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { mutateAsync: signIn } = usePostSignIn();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        const authCode = searchParams.get('code');
        const callbackState = searchParams.get('state');
        const redirectUri = `${window.location.origin}/callback`;

        if (!authCode) {
          throw new Error('인가 코드가 누락되었습니다.');
        }

        const savedState = sessionStorage.getItem(OAUTH_SESSION_KEYS.STATE);
        if (!savedState || callbackState !== savedState) {
          throw new Error('잘못된 인증 요청입니다. 다시 로그인해주세요.');
        }

        const codeVerifier = sessionStorage.getItem(OAUTH_SESSION_KEYS.CODE_VERIFIER);
        if (!codeVerifier) {
          throw new Error('PKCE 검증 정보가 없습니다. 다시 로그인해주세요.');
        }

        const { data: signInData } = await signIn({ authCode, redirectUri, codeVerifier });

        setCookie(COOKIE_KEYS.ACCESS_TOKEN, signInData.accessToken);
        sessionStorage.setItem('login_success', 'true');

        router.replace('/');
      } catch (error) {
        const message = error instanceof Error ? error.message : '로그인 중 오류가 발생했습니다.';

        setErrorMessage(message);
        sessionStorage.setItem('login_error', 'true');

        setTimeout(() => {
          router.replace('/');
        }, 3000);
      } finally {
        sessionStorage.removeItem(OAUTH_SESSION_KEYS.STATE);
        sessionStorage.removeItem(OAUTH_SESSION_KEYS.CODE_VERIFIER);
      }
    };

    void handleOAuthCallback();
  }, [router, searchParams, signIn]);

  return (
    <main className={cn('flex min-h-screen items-center justify-center bg-[#191919] p-4')}>
      <div
        className={cn(
          'flex w-full max-w-120 flex-col items-center gap-y-4 rounded-xl border border-[#2F2F2F] bg-[rgba(34,34,34,0.5)] p-8 text-center backdrop-blur-[18px]',
        )}
      >
        {errorMessage ? (
          <>
            <h1 className={cn('text-2xl font-semibold text-[#FF7C7C]')}>로그인 실패</h1>
            <p className={cn('text-sm font-medium text-[#DDDDDD]')}>{errorMessage}</p>
            <p className={cn('text-xs font-medium text-[#9A9A9A]')}>
              잠시 후 메인 페이지로 이동합니다.
            </p>
          </>
        ) : (
          <>
            <h1 className={cn('text-2xl font-semibold text-white')}>로그인 처리 중</h1>
            <p className={cn('text-sm font-medium text-[#DDDDDD]')}>잠시만 기다려주세요.</p>
          </>
        )}
      </div>
    </main>
  );
};

const CallbackFallback = () => {
  return (
    <main className={cn('flex min-h-screen items-center justify-center bg-[#191919] p-4')}>
      <div
        className={cn(
          'flex w-full max-w-120 flex-col items-center gap-y-4 rounded-xl border border-[#2F2F2F] bg-[rgba(34,34,34,0.5)] p-8 text-center backdrop-blur-[18px]',
        )}
      >
        <h1 className={cn('text-2xl font-semibold text-white')}>로그인 처리 중</h1>
        <p className={cn('text-sm font-medium text-[#DDDDDD]')}>잠시만 기다려주세요.</p>
      </div>
    </main>
  );
};

const CallbackPage = () => {
  return (
    <Suspense fallback={<CallbackFallback />}>
      <CallbackContent />
    </Suspense>
  );
};

export default CallbackPage;
