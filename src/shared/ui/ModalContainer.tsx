'use client';

import { useEffect } from 'react';

import { useModalStore } from '@/shared/stores';
import { cn } from '@/shared/utils';

const ModalContainer = () => {
  const { isOpen, content, closeModal } = useModalStore();

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;

    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  if (!isOpen || !content) return null;

  return (
    <div
      className={cn('fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.20)] px-12')}
      onClick={closeModal}
    >
      <div
        className={cn('flex w-full items-center justify-center')}
        onClick={(e) => {
          e.stopPropagation();
          closeModal();
        }}
      >
        {content}
      </div>
    </div>
  );
};

export default ModalContainer;
