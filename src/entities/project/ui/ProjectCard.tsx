'use client';

import { useState } from 'react';

import Image from 'next/image';

import type { ProjectType } from '@/entities/project/model/types';
import { ArrowIcon } from '@/shared/assets';
import { cn } from '@/shared/utils';

interface ProjectCardProps {
  data: ProjectType;
  likeButton?: React.ReactNode;
  onDetailClick?: () => void;
}

const ProjectCard = ({ data, likeButton, onDetailClick }: ProjectCardProps) => {
  const { logo, title, affiliation, description, techStack, prodUrl } = data;
  const hasLogo = Boolean(logo?.trim());
  const displayAffiliation = affiliation ?? '소속 정보 없음';

  const [isCenterHover, setIsCenterHover] = useState(false);

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
          <div className={cn('flex h-6.5 flex-wrap gap-x-1.5 overflow-hidden')}>
            {techStack.map((stack) => (
              <span
                key={stack.stackName}
                className={cn(
                  'rounded-full bg-[#4F4F4F] px-2 py-1.5 text-xs leading-[.9rem] font-medium text-white',
                )}
              >
                {stack.stackName}
              </span>
            ))}
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
