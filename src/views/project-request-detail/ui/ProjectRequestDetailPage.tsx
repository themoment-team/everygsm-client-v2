'use client';

import Link from 'next/link';

import { ProjectResponseType, useGetMyProject } from '@/entities/project';
import { ArrowIcon } from '@/shared/assets';
import { cn } from '@/shared/utils';
import { ProjectRequestDetailContent } from '@/widgets/project-request-detail';

interface ProjectRequestDetailPageProps {
  projectId: number;
  initialProjectData: ProjectResponseType | undefined;
}

const ProjectRequestDetailPage = ({
  projectId,
  initialProjectData,
}: ProjectRequestDetailPageProps) => {
  const { data: myProjectData } = useGetMyProject(projectId, {
    initialData: initialProjectData,
  });
  const project = myProjectData?.data ?? initialProjectData?.data;

  return (
    <main className={cn('min-h-[calc(100vh-72px)] bg-[#191919] px-4')}>
      <div className={cn('flex justify-center pt-10 pb-10')}>
        <div
          className={cn(
            'relative flex w-full max-w-276 flex-col items-center justify-center gap-y-4',
          )}
        >
          <Link
            href="/mypage"
            className={cn(
              'absolute top-9 left-0 flex items-center gap-x-3 text-base leading-[1.2rem] font-medium tracking-[-0.02rem] text-[#FFFFFF]',
            )}
          >
            <span className={cn('rotate-180')}>
              <ArrowIcon color="#DDDDDD" />
            </span>
            마이 페이지
          </Link>
          <ProjectRequestDetailContent project={project} />
        </div>
      </div>
    </main>
  );
};

export default ProjectRequestDetailPage;
