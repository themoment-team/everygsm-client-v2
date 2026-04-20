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

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeModal]);

  if (!isOpen || !content) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex w-full items-center justify-center bg-[rgba(0,0,0,0.20)] px-12',
      )}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          closeModal();
        }
      }}
    >
      {content}
    </div>
  );
};

export default ModalContainer;
