'use client';

import { useLayoutEffect, useRef, useState } from 'react';

import Image from 'next/image';

import type { ProjectType } from '@/entities/project/model/types';
import { ArrowIcon } from '@/shared/assets';
import { cn } from '@/shared/utils';

interface ProjectCardProps {
  data: ProjectType;
  likeButton?: React.ReactNode;
  onDetailClick?: () => void;
}

const techStackPillClassName =
  'rounded-full bg-[#4F4F4F] px-2 py-1.5 text-xs leading-[.9rem] font-medium whitespace-nowrap text-white';

const ProjectCard = ({ data, likeButton, onDetailClick }: ProjectCardProps) => {
  const { logo, title, affiliation, description, techStack, prodUrl } = data;
  const hasLogo = Boolean(logo?.trim());
  const displayAffiliation = affiliation ?? '소속 정보 없음';
  const [isCenterHover, setIsCenterHover] = useState(false);
  const [visibleTechStackCount, setVisibleTechStackCount] = useState(techStack.length);
  const techStackListRef = useRef<HTMLDivElement>(null);
  const techStackMeasureRef = useRef<HTMLDivElement>(null);
  const moreTechStackMeasureRef = useRef<HTMLSpanElement>(null);
  const visibleTechStack = techStack.slice(0, visibleTechStackCount);
  const hiddenTechStackCount = techStack.length - visibleTechStack.length;

  useLayoutEffect(() => {
    const listElement = techStackListRef.current;
    const measureElement = techStackMeasureRef.current;
    const moreMeasureElement = moreTechStackMeasureRef.current;

    if (!listElement || !measureElement || !moreMeasureElement) return;

    const measureVisibleTechStackCount = () => {
      const availableWidth = listElement.clientWidth;
      const techStackElements = Array.from(
        measureElement.querySelectorAll<HTMLElement>('[data-tech-stack-item]'),
      );
      const gap = Number.parseFloat(window.getComputedStyle(listElement).columnGap);
      const gapWidth = Number.isNaN(gap) ? 0 : gap;
      const techStackWidths = techStackElements.map((element) => element.offsetWidth);
      const widthSums = techStackWidths.reduce<number[]>(
        (sums, width) => [...sums, sums[sums.length - 1] + width],
        [0],
      );

      for (let count = techStackElements.length; count >= 0; count -= 1) {
        const hiddenCount = techStackElements.length - count;
        moreMeasureElement.textContent = `+${hiddenCount}`;

        const moreWidth = hiddenCount > 0 ? moreMeasureElement.offsetWidth : 0;
        const renderedItemCount = count + (hiddenCount > 0 ? 1 : 0);
        const totalGapWidth = Math.max(renderedItemCount - 1, 0) * gapWidth;
        const totalWidth = widthSums[count] + moreWidth + totalGapWidth;

        if (totalWidth <= availableWidth) {
          setVisibleTechStackCount(count);
          return;
        }
      }

      setVisibleTechStackCount(0);
    };

    measureVisibleTechStackCount();

    const resizeObserver = new ResizeObserver(measureVisibleTechStackCount);
    resizeObserver.observe(listElement);

    return () => resizeObserver.disconnect();
  }, [techStack]);

  return (
    <div
      className={cn(
        'relative flex h-82.5 w-full max-w-70 flex-col justify-between rounded-xl bg-[rgba(34,34,34,0.50)] p-6 shadow-[inset_0_0_0_1px_#2F2F2F] backdrop-blur-[1.125rem]',
      )}
    >
      <div
        onMouseEnter={() => setIsCenterHover(true)}
        onMouseLeave={() => setIsCenterHover(false)}
        className={cn(
          'absolute inset-0 z-10 flex flex-col items-center justify-center gap-6 rounded-xl bg-[rgba(38,38,38,1)] p-6 shadow-[inset_0_0_0_1px_#2F2F2F] backdrop-blur-[1.125rem] transition-opacity duration-100',
          isCenterHover ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        )}
      >
        {hasLogo ? (
          <div className={cn('relative h-14 w-14 overflow-hidden rounded-full')}>
            <Image src={logo} alt={title} fill sizes="56px" className={cn('object-cover')} />
          </div>
        ) : (
          <div aria-hidden className={cn('h-14 w-14 rounded-full bg-[#4F4F4F]')} />
        )}
        <a
          href={prodUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'flex cursor-pointer items-center gap-x-4 text-xl leading-6 font-semibold text-white',
          )}
        >
          프로젝트 배포 URL 이동
          <ArrowIcon isLarge />
        </a>
      </div>

      <div>
        <div className={cn('mb-4 flex justify-between')}>
          {hasLogo ? (
            <div className={cn('relative h-14 w-14 overflow-hidden rounded-full')}>
              <Image src={logo} alt={title} fill sizes="56px" className={cn('object-cover')} />
            </div>
          ) : (
            <div aria-hidden className={cn('h-14 w-14 rounded-full bg-[#4F4F4F]')} />
          )}
          {likeButton}
        </div>
        <div
          onMouseEnter={() => setIsCenterHover(true)}
          onMouseLeave={() => setIsCenterHover(false)}
          className={cn('flex flex-col gap-y-4')}
        >
          <div className={cn('flex flex-col gap-y-2')}>
            <h3 className={cn('text-xl leading-6 font-semibold text-white')}>{title}</h3>
            <p className={cn('text-sm leading-4.25 font-medium text-[#9A9A9A]')}>
              {displayAffiliation}
            </p>
          </div>
          <div className={cn('line-clamp-2 h-9 text-xs leading-4.5 font-medium text-[#9A9A9A]')}>
            {description}
          </div>
          <div
            ref={techStackListRef}
            className={cn('relative flex flex-wrap gap-x-1.5 overflow-hidden')}
          >
            {visibleTechStack.map((stack, index) => (
              <span key={`${stack.stackName}-${index}`} className={cn(techStackPillClassName)}>
                {stack.stackName}
              </span>
            ))}
            {hiddenTechStackCount > 0 && (
              <span className={cn(techStackPillClassName)}>+{hiddenTechStackCount}</span>
            )}
            <div
              ref={techStackMeasureRef}
              aria-hidden
              className={cn(
                'pointer-events-none absolute top-0 left-0 flex gap-x-1.5 overflow-hidden opacity-0',
              )}
            >
              {techStack.map((stack, index) => (
                <span
                  key={`${stack.stackName}-${index}`}
                  data-tech-stack-item
                  className={cn(techStackPillClassName)}
                >
                  {stack.stackName}
                </span>
              ))}
              <span ref={moreTechStackMeasureRef} className={cn(techStackPillClassName)} />
            </div>
          </div>
        </div>
      </div>
      <div
        className={cn(
          'flex cursor-pointer justify-end rounded-xl px-3 py-1.5 duration-100 hover:bg-[rgba(51,51,51,0.5)]',
        )}
        onClick={onDetailClick}
      >
        <button
          className={cn(
            'flex cursor-pointer items-center gap-x-4 text-xs leading-4.5 font-medium text-white',
          )}
        >
          프로젝트 상세 보기
          <ArrowIcon />
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
