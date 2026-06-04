'use client';

import { useEffect, useRef, useState } from 'react';

import Link from 'next/link';

import { createPortal } from 'react-dom';

import { DeleteConfirmModal } from '@/features/delete-project';
import { ArrowIcon, HamburgerIcon } from '@/shared/assets';
import { useModalStore } from '@/shared/stores';
import { cn } from '@/shared/utils';

interface ProjectActionMenuProps {
  projectId: number;
  editLabel?: string;
  deleteLabel?: string;
}

const ProjectActionMenu = ({
  projectId,
  editLabel = '프로젝트 수정하기',
  deleteLabel = '프로젝트 삭제',
}: ProjectActionMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { openModal } = useModalStore();

  const handleToggle = () => {
    if (!isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownStyle({
        top: rect.top + 8,
        right: window.innerWidth - rect.right - 4,
      });
    }
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (buttonRef.current?.contains(target) || dropdownRef.current?.contains(target)) return;
      setIsOpen(false);
    };

    const handleClose = () => setIsOpen(false);

    document.addEventListener('mousedown', handleOutside);
    window.addEventListener('scroll', handleClose, { passive: true, capture: true });
    window.addEventListener('resize', handleClose);

    return () => {
      document.removeEventListener('mousedown', handleOutside);
      window.removeEventListener('scroll', handleClose, { capture: true });
      window.removeEventListener('resize', handleClose);
    };
  }, [isOpen]);

  const handleDelete = () => {
    setIsOpen(false);
    openModal(<DeleteConfirmModal projectId={projectId} />);
  };

  return (
    <>
      <button
        ref={buttonRef}
        onClick={handleToggle}
        className={cn('cursor-pointer')}
        aria-label="프로젝트 메뉴 열기"
      >
        <HamburgerIcon />
      </button>

      {isOpen &&
        createPortal(
          <div
            ref={dropdownRef}
            style={dropdownStyle}
            className={cn(
              'fixed z-50 flex flex-col items-end gap-2 rounded-xl bg-[rgba(34,34,34,0.50)] p-3 shadow-[inset_0_0_0_1px_#2F2F2F] backdrop-blur-[1.125rem]',
            )}
          >
            <Link
              href={`/mypage/edit/${projectId}`}
              onClick={() => setIsOpen(false)}
              className={cn(
                'flex cursor-pointer items-center gap-4 px-3 py-1.5 text-base leading-6 font-medium whitespace-nowrap text-white',
              )}
            >
              {editLabel}
              <ArrowIcon />
            </Link>
            <button
              onClick={handleDelete}
              className={cn(
                'flex cursor-pointer items-center gap-4 px-3 py-1.5 text-base leading-6 font-medium whitespace-nowrap text-white',
              )}
            >
              {deleteLabel}
              <ArrowIcon />
            </button>
          </div>,
          document.body,
        )}
    </>
  );
};

export default ProjectActionMenu;
