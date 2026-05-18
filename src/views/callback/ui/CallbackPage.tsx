'use client';

import { Suspense } from 'react';

import { cn } from '@/shared/utils';

import { useHandleOAuthCallback } from '../model/useHandleOAuthCallback';

const CallbackContent = () => {
  const { errorMessage } = useHandleOAuthCallback();

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
