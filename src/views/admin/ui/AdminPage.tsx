'use client';

import { ProjectsListResponseType, useGetPendingProjects } from '@/entities/project';
import { cn } from '@/shared/utils';
import { HeroSection } from '@/widgets/hero-section';
import { ProjectRequestList } from '@/widgets/project-request-list';

interface AdminPageProps {
  initialRequestedProjectsData?: ProjectsListResponseType;
}

const AdminPage = ({ initialRequestedProjectsData }: AdminPageProps) => {
  const { data } = useGetPendingProjects({ initialData: initialRequestedProjectsData });
  const pendingProjects = data?.data.projects ?? [];

  return (
    <main className={cn('flex min-h-[calc(100vh-72px)] flex-col bg-[#191919] p-4')}>
      <div className={cn('flex flex-col items-center gap-y-10 pt-10 pb-40')}>
        <div className={cn('flex w-full max-w-295 items-center justify-between')}>
          <HeroSection title="등록 요청된 프로젝트" />
        </div>
        <ProjectRequestList projects={pendingProjects} detailPathPrefix="/admin/request" />
      </div>
    </main>
  );
};

export default AdminPage;
