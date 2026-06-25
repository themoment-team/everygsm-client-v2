'use client';

import { useRef, useState } from 'react';

import { ArrowIcon } from '@/shared/assets';
import { useOnClickOutside } from '@/shared/hooks';
import { cn } from '@/shared/utils';

import { PROJECT_SORT_OPTIONS } from '../model/constants';
import type { ProjectSortType } from '../model/types';

interface ProjectSortSelectProps {
  selectedSort: ProjectSortType;
  onChange: (sort: ProjectSortType) => void;
}

const ProjectSortSelect = ({ selectedSort, onChange }: ProjectSortSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(containerRef as React.RefObject<HTMLElement>, () => setIsOpen(false));

  const selectedLabel = PROJECT_SORT_OPTIONS.find((option) => option.value === selectedSort)?.label;

  const handleSelect = (sort: ProjectSortType) => {
    onChange(sort);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={cn('relative w-45')}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          'flex w-full items-center justify-between rounded-xl border border-[#2F2F2F] bg-[rgba(34,34,34,0.5)] px-4 py-3 shadow-[0px_0px_16px_0px_rgba(10,6,29,0.25)] backdrop-blur-[1.125rem]',
        )}
      >
        <span className={cn('text-base font-medium tracking-[-0.03em] text-white')}>
          {selectedLabel}
        </span>
        <span className={cn(isOpen ? '-rotate-90' : 'rotate-90')}>
          <ArrowIcon />
        </span>
      </button>

      {isOpen && (
        <div
          className={cn(
            'absolute top-full left-0 z-10 mt-2 flex w-full flex-col items-start gap-2.5 rounded-xl border border-[#2F2F2F] bg-[rgba(34,34,34,0.5)] px-4 py-3 shadow-[0px_0px_16px_0px_rgba(10,6,29,0.25)] backdrop-blur-[1.125rem]',
          )}
        >
          <div className={cn('flex w-full items-center gap-4')}>
            <span className={cn('text-xs text-[#6A6A6A]')}>정렬</span>
            <div className={cn('h-px flex-1 bg-[#2F2F2F]')} />
          </div>

          {PROJECT_SORT_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option.value)}
              className={cn(
                'w-full py-1 text-left text-sm font-medium tracking-[-0.03em]',
                option.value === selectedSort ? 'text-[#FC335A]' : 'text-white',
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectSortSelect;
