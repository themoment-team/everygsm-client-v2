'use client';

import { ProjectRequestCard, ProjectType } from '@/entities/project';
import { cn } from '@/shared/utils';

interface ProjectRequestListProps {
  projects: ProjectType[];
  detailPathPrefix?: '/admin/request' | '/mypage/request';
  renderActionButton?: (project: ProjectType) => React.ReactNode;
}

const ProjectRequestList = ({
  projects,
  detailPathPrefix,
  renderActionButton,
}: ProjectRequestListProps) => {
  return (
    <div className={cn('mx-auto flex w-full max-w-295 flex-col gap-y-4')}>
      {projects.map((project) => (
        <ProjectRequestCard
          key={project.projectId}
          data={project}
          detailPathPrefix={detailPathPrefix}
          actionButton={renderActionButton?.(project)}
        />
      ))}
    </div>
  );
};

export default ProjectRequestList;
