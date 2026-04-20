import { cn } from '@/shared/utils';

interface SuspenseFallbackProps {
  title?: string;
  description?: string;
}

const SuspenseFallback = ({
  title = '페이지를 불러오는 중',
  description = '잠시만 기다려주세요.',
}: SuspenseFallbackProps) => {
  return (
    <main
      className={cn('flex min-h-[calc(100vh-72px)] items-center justify-center bg-[#191919] p-4')}
    >
      <div
        className={cn(
          'flex w-full max-w-120 flex-col items-center gap-y-4 rounded-xl border border-[#2F2F2F] bg-[rgba(34,34,34,0.5)] p-8 text-center backdrop-blur-[18px]',
        )}
      >
        <h1 className={cn('text-2xl font-semibold text-white')}>{title}</h1>
        <p className={cn('text-sm font-medium text-[#DDDDDD]')}>{description}</p>
      </div>
    </main>
  );
};

export default SuspenseFallback;
