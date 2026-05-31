'use client';

import React, { useRef, useState } from 'react';

import Link from 'next/link';

import { DeleteConfirmModal } from '@/features/delete-project';
import { ArrowIcon, HamburgerIcon } from '@/shared/assets';
import { useOnClickOutside } from '@/shared/hooks';
import { useModalStore } from '@/shared/stores';
import { cn } from '@/shared/utils';

interface ProjectActionMenuProps {
  projectId: number;
}

const ProjectActionMenu = ({ projectId }: ProjectActionMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { openModal } = useModalStore();

  useOnClickOutside(menuRef as React.RefObject<HTMLElement>, () => setIsOpen(false));

  const handleDelete = () => {
    setIsOpen(false);
    openModal(<DeleteConfirmModal projectId={projectId} />);
  };

  return (
    <div ref={menuRef} className={cn('relative')}>
      <button
        onClick={() => {
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
            'absolute top-3 right-2 z-50 flex flex-col items-end gap-2 rounded-xl bg-[rgba(34,34,34,0.50)] p-3 shadow-[inset_0_0_0_1px_#2F2F2F] backdrop-blur-[1.125rem]',
          )}
        >
          <Link
            href={`/mypage/edit/${projectId}`}
            onClick={() => setIsOpen(false)}
            className={cn(
              'flex cursor-pointer items-center gap-4 px-3 py-1.5 text-base leading-6 font-medium whitespace-nowrap text-white',
            )}
          >
            프로젝트 수정하기
            <ArrowIcon />
          </Link>
          <button
            onClick={handleDelete}
            className={cn(
              'flex cursor-pointer items-center gap-4 px-3 py-1.5 text-base leading-6 font-medium whitespace-nowrap text-white',
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
