import Link from 'next/link';

import { RegisterProjectForm } from '@/features/register-project';
import { ArrowIcon } from '@/shared/assets';
import { cn } from '@/shared/utils';

const RegisterPage = () => {
  return (
    <main className={cn('min-h-[calc(100vh-72px)] bg-[#191919] p-4')}>
      <div className={cn('flex justify-center pt-10 pb-10')}>
        <div
          className={cn(
            'relative flex w-full max-w-267.5 flex-col items-center justify-center gap-y-4',
          )}
        >
          <Link
            href="/mypage"
            className={cn(
              'absolute top-3 left-0 flex items-center gap-x-3 text-base leading-[1.2rem] font-medium tracking-[-0.02rem] text-[#FFFFFF]',
            )}
          >
            <span className={cn('rotate-180')}>
              <ArrowIcon color="#DDDDDD" />
            </span>
            이전으로
          </Link>
          <RegisterProjectForm />
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;
