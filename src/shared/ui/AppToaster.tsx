'use client';

import { Toaster } from 'sonner';

import { cn } from '@/shared/utils';

const AppToaster = () => {
  return (
    <Toaster
      position="top-right"
      style={{ top: '80px' }}
      closeButton
      toastOptions={{
        duration: 4500,
        style: {
          background: '#1b1b1b',
          border: '1px solid #2F2F2F',
          fontWeight: 600,
        },
        classNames: {
          success: cn('!text-[#7eff57] [&_[data-sonner-icon]]:text-[#52c41a]'),
          error: cn('!text-[#ff4d4f] [&_[data-sonner-icon]]:text-[#ff4d4f]'),
          warning: cn('!text-[#ffd049] [&_[data-sonner-icon]]:text-[#faad14]'),
          info: cn('!text-[#4dabf7] [&_[data-sonner-icon]]:text-[#339af0]'),
          closeButton: cn(
            '!left-auto !right-[-4px] !top-2',
            '!bg-transparent !border-none !shadow-none',
            '!text-[#666666] hover:!bg-transparent',
          ),
        },
      }}
    />
  );
};

export default AppToaster;
