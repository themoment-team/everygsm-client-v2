'use client';

import Link from 'next/link';

import { ProjectResponseType } from '@/entities/project';
import { UserSummaryType } from '@/entities/user';
import { EditConfirmModal, EditProjectReqType } from '@/features/edit-project';
import { RegisterProjectForm } from '@/features/register-project';
import { ArrowIcon } from '@/shared/assets';
import { useModalStore } from '@/shared/stores';
import { cn } from '@/shared/utils';
import { HeroSection } from '@/widgets/hero-section';

interface EditProjectPageProps {
  projectId: number;
  initialProjectData: ProjectResponseType;
}

const EditProjectPage = ({ projectId, initialProjectData }: EditProjectPageProps) => {
  const { openModal } = useModalStore();
  const project = initialProjectData.data;

  const initialData = {
    logo: project.logo,
    title: project.title,
    affiliation: project.affiliation ?? '',
    startYear: project.startYear,
    description: project.description,
    prodUrl: project.prodUrl,
    techStack: project.techStack,
    repository: project.repository.map((r) => r.repoUrl),
    participantIds: project.participants.map((p) => p.userId),
  };

  const initialParticipants: UserSummaryType[] = project.participants;

  const handleValidSubmit = (data: EditProjectReqType) => {
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
            <RegisterProjectForm
              mode="edit"
              initialData={initialData}
              initialParticipants={initialParticipants}
              onValidSubmit={handleValidSubmit}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default EditProjectPage;
