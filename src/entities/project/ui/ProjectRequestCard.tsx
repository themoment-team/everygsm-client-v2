import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/shared/utils';

import { getProjectRequestStatusMeta } from '../model/requestStatus';
import type { ProjectType } from '../model/types';

interface ProjectRequestCardProps {
  data: ProjectType;
}

const ProjectRequestCard = ({ data }: ProjectRequestCardProps) => {
  const { logo, title, affiliation, createdAt, status, projectId } = data;
  const requestStatusMeta = getProjectRequestStatusMeta(status);
  const formattedDate = new Date(createdAt).toISOString().substring(0, 10);

  return (
    <Link
      href={`/mypage/request/${projectId}`}
      className={cn(
        'flex w-full max-w-295 justify-between rounded-xl bg-[rgba(34,34,34,0.50)] p-6 shadow-[inset_0_0_0_1px_#2F2F2F] backdrop-blur-[1.125rem]',
      )}
    >
      <div className={cn('flex items-center gap-x-4')}>
        <div className={cn('relative h-14 w-14 overflow-hidden rounded-full')}>
          <Image src={logo} alt={title} fill sizes="56px" className={cn('object-cover')} />
        </div>
        <div className={cn('flex flex-col gap-y-2')}>
          <h3 className={cn('text-xl leading-6 font-semibold text-white')}>{title}</h3>
          <p className={cn('text-sm leading-4.25 text-[#9A9A9A]')}>{affiliation}</p>
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
  );
};

export default ProjectRequestCard;
