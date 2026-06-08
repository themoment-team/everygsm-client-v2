'use client';

import { ProjectRequestCard, ProjectType } from '@/entities/project';
import { cn } from '@/shared/utils';

interface ProjectRequestListProps {
  projects: ProjectType[];
  detailPathPrefix?: '/admin/request' | '/mypage/request';
}

const ProjectRequestList = ({ projects, detailPathPrefix }: ProjectRequestListProps) => {
  return (
    <div className={cn('mx-auto flex w-full max-w-295 flex-col gap-y-4')}>
      {projects.map((project) => (
        <ProjectRequestCard
          key={project.projectId}
          data={project}
          detailPathPrefix={detailPathPrefix}
        />
      ))}
    </div>
  );
};

export default ProjectRequestList;
