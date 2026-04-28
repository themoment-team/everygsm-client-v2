import { notFound, redirect } from 'next/navigation';

import { getMyProject } from '@/entities/project/index.server';
import { ProjectRequestDetailPage } from '@/views/project-request-detail';

const ProjectRequestDetail = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const projectId = Number(id);

  if (Number.isNaN(projectId)) {
    notFound();
  }

  const initialProjectData = await getMyProject(projectId);

  if (initialProjectData?.code === 403) {
    redirect('/mypage?error=forbidden');
  }

  if (initialProjectData?.code === 404) {
    notFound();
  }

  return <ProjectRequestDetailPage projectId={projectId} initialProjectData={initialProjectData} />;
};

export default ProjectRequestDetail;
