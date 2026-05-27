'use client';

import { useEffect, useRef, useState } from 'react';

import { ArrowIcon, HamburgerIcon } from '@/shared/assets';
import { useModalStore } from '@/shared/stores';
import { cn } from '@/shared/utils';

import DeleteConfirmModal from './DeleteConfirmModal';

interface ProjectActionMenuProps {
  projectId: number;
}

const ProjectActionMenu = ({ projectId }: ProjectActionMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { openModal } = useModalStore();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDelete = () => {
    setIsOpen(false);
    openModal(<DeleteConfirmModal projectId={projectId} />);
  };

  return (
    <div ref={menuRef} className={cn('relative')}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
        className={cn('cursor-pointer')}
        aria-label="프로젝트 메뉴 열기"
      >
        <HamburgerIcon />
      </button>

      {isOpen && (
        <div
          className={cn(
            'absolute top-8 right-0 z-50 inline-flex flex-col items-end justify-center gap-2 rounded-xl border border-[#2F2F2F] bg-[rgba(34,34,34,0.50)] p-3 backdrop-blur-[18px]',
          )}
        >
          <button
            className={cn(
              'flex cursor-pointer items-center gap-4 py-1.5 text-base leading-6 font-medium whitespace-nowrap text-white',
            )}
          >
            프로젝트 수정하기
            <ArrowIcon />
          </button>
          <button
            onClick={handleDelete}
            className={cn(
              'flex cursor-pointer items-center gap-4 py-1.5 text-base leading-6 font-medium whitespace-nowrap text-white',
            )}
          >
            프로젝트 삭제
            <ArrowIcon />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectActionMenu;
