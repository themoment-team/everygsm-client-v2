'use client';

import { RegisterProjectForm } from '@/features/register-project';
import { cn } from '@/shared/utils';

const RegisterPage = () => {
  return (
    <div className={cn('flex min-h-full w-full justify-center bg-[#191919] py-10')}>
      <div className={cn('flex w-200 flex-col gap-[2.19rem]')}>
        <div>
          <h1
            className={cn('text-[2.25rem] leading-[1.2] font-bold tracking-[-0.045rem] text-white')}
          >
            프로젝트 등록
          </h1>
        </div>
        <RegisterProjectForm />
      </div>
    </div>
  );
};

export default RegisterPage;
