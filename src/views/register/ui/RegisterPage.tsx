import { RegisterProjectForm } from '@/features/register-project';
import { cn } from '@/shared/utils';
import { HeroSection } from '@/widgets/hero-section';

const RegisterPage = () => {
  return (
    <div className={cn('flex min-h-full w-full justify-center bg-[#191919] py-10')}>
      <div className={cn('flex w-200 flex-col gap-[2.19rem]')}>
        <HeroSection title="프로젝트 등록" />
        <RegisterProjectForm />
      </div>
    </div>
  );
};

export default RegisterPage;
