import { Suspense } from 'react';

import { notFound, redirect } from 'next/navigation';

import type { Metadata } from 'next';

import { getMyProject } from '@/entities/project/index.server';
import { SuspenseFallback } from '@/shared/ui';
import { EditProjectPage } from '@/views/edit-project';

export const metadata: Metadata = {
  title: '프로젝트 수정',
  robots: { index: false, follow: false },
};

const EditProject = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const projectId = Number(id);

  if (Number.isNaN(projectId)) {
    notFound();
  }

  const initialProjectData = await getMyProject(projectId);

  if (initialProjectData?.code === 403) {
    redirect('/mypage');
  }

  if (initialProjectData?.code === 404) {
    notFound();
  }

  return (
    <Suspense fallback={<SuspenseFallback />}>
      <EditProjectPage projectId={projectId} initialProjectData={initialProjectData} />
    </Suspense>
  );
};

export default EditProject;
