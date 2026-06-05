'use client';

import Link from 'next/link';

import { ProjectFormReqType, ProjectResponseType, useGetMyProject } from '@/entities/project';
import { UserSummaryType } from '@/entities/user';
import { EditConfirmModal } from '@/features/edit-project';
import { ProjectForm } from '@/features/project-form';
import { ArrowIcon } from '@/shared/assets';
import { useModalStore } from '@/shared/stores';
import { cn } from '@/shared/utils';
import { HeroSection } from '@/widgets/hero-section';

interface EditProjectPageProps {
  projectId: number;
  initialProjectData: ProjectResponseType | undefined;
}

const EditProjectPage = ({ projectId, initialProjectData }: EditProjectPageProps) => {
  const { openModal } = useModalStore();
  const { data: myProjectData } = useGetMyProject(projectId, {
    initialData: initialProjectData,
  });
  const project = myProjectData?.data ?? initialProjectData?.data;

  const initialData = {
    logo: project?.logo,
    title: project?.title,
    affiliation: project?.affiliation ?? '',
    startYear: project?.startYear,
    description: project?.description,
    prodUrl: project?.prodUrl,
    techStack: project?.techStack,
    repository: project?.repository.map((r) => r.repoUrl),
    participantIds: project?.participants.map((p) => p.userId),
  };

  const initialParticipants: UserSummaryType[] = project?.participants || [];

  const handleValidSubmit = (data: ProjectFormReqType) => {
    openModal(<EditConfirmModal projectId={projectId} requestBody={data} />);
  };

  return (
    <main className={cn('min-h-[calc(100vh-72px)] bg-[#191919] px-4')}>
      <div className={cn('flex justify-center pt-10 pb-10')}>
        <div
          className={cn(
            'relative flex w-full max-w-267.5 flex-col items-center justify-center gap-y-4',
          )}
        >
          <Link
            href="/mypage"
            className={cn(
              'absolute top-3 left-0 flex items-center gap-x-3 text-base leading-[1.2rem] font-medium tracking-[-0.02rem] text-[#FFFFFF]',
            )}
          >
            <span className={cn('rotate-180')}>
              <ArrowIcon color="#DDDDDD" />
            </span>
            이전으로
          </Link>
          <div className={cn('flex w-full max-w-200 flex-col items-center justify-center gap-y-9')}>
            <HeroSection title="프로젝트 수정" />
            {project ? (
              <ProjectForm
                mode="edit"
                initialData={initialData}
                initialParticipants={initialParticipants}
                onValidSubmit={handleValidSubmit}
              />
            ) : (
              <div className="text-white">로딩 중...</div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default EditProjectPage;
