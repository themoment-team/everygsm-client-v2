import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/shared/utils';

import { getProjectRequestStatusMeta } from '../model/requestStatus';
import type { ProjectType } from '../model/types';

interface ProjectRequestCardProps {
  data: ProjectType;
  detailPathPrefix?: '/admin/request' | '/mypage/request';
  actionButton?: React.ReactNode;
}

const ProjectRequestCard = ({
  data,
  detailPathPrefix = '/mypage/request',
  actionButton,
}: ProjectRequestCardProps) => {
  const { logo, title, affiliation, createdAt, status, projectId } = data;
  const requestStatusMeta = getProjectRequestStatusMeta(status);
  const formattedDate = new Date(createdAt).toISOString().substring(0, 10);
  const hasLogo = Boolean(logo?.trim());
  const displayAffiliation = affiliation ?? '소속 정보 없음';

  return (
    <div
      className={cn(
        'flex w-full max-w-295 items-center justify-between gap-x-7 rounded-xl bg-[rgba(34,34,34,0.50)] p-6 shadow-[inset_0_0_0_1px_#2F2F2F] backdrop-blur-[1.125rem]',
      )}
    >
      <Link
        href={`${detailPathPrefix}/${projectId}`}
        className={cn('flex flex-1 items-center justify-between')}
      >
        <div className={cn('flex items-center gap-x-4')}>
          {hasLogo ? (
            <div className={cn('relative h-14 w-14 overflow-hidden rounded-full')}>
              <Image src={logo} alt={title} fill sizes="56px" className={cn('object-cover')} />
            </div>
          ) : (
            <div aria-hidden className={cn('h-14 w-14 rounded-full bg-[#4F4F4F]')} />
          )}
          <div className={cn('flex flex-col gap-y-2')}>
            <h3 className={cn('text-xl leading-6 font-semibold text-white')}>{title}</h3>
            <p className={cn('text-sm leading-4.25 text-[#9A9A9A]')}>{displayAffiliation}</p>
          </div>
        </div>
        <div className={cn('flex items-center gap-x-4')}>
          <p className={cn('text-sm leading-4.25 text-[#9A9A9A]')}>{formattedDate}</p>
          <p className={cn('text-xl leading-6 font-semibold')}>
            <span className={cn('text-white')}>요청 상태: </span>
            <span className={cn(requestStatusMeta.textColorClassName)}>
              {requestStatusMeta.label}
            </span>
          </p>
        </div>
      </Link>
      {actionButton}
    </div>
  );
};

export default ProjectRequestCard;
