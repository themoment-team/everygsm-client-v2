import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ProjectFormReqType } from '@/entities/project';
import { patch, projectQueryKeys, projectUrl } from '@/shared/api';

export const usePatchMyProject = (projectId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: projectQueryKeys.patchMyProject(projectId),
    mutationFn: (body: ProjectFormReqType) => patch(projectUrl.patchMyProject(projectId), body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectQueryKeys.getMyProjects() });
      queryClient.invalidateQueries({ queryKey: projectQueryKeys.getMyPendingProjects() });
      queryClient.invalidateQueries({ queryKey: projectQueryKeys.getMyProject(projectId) });
    },
  });
};
