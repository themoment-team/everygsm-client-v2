import { cn } from '@/shared/utils';
import { HeroSection } from '@/widgets/hero-section';

const RegisterProjectForm = () => {
  return (
    <form className={cn('flex w-full max-w-200 flex-col gap-y-9')}>
      <HeroSection title="프로젝트 등록" />
      <div className="flex flex-col gap-3">
        <p className="text-base leading-[1.2rem] font-medium tracking-[-0.02rem] text-[#DDD]">
          프로젝트 로고
        </p>
      </div>
    </form>
  );
};

export default RegisterProjectForm;
