import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ProjectFormReqType } from '@/entities/project';
import { patch, projectQueryKeys, projectUrl } from '@/shared/api';

export const usePatchMyProject = (projectId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: ProjectFormReqType) => patch(projectUrl.patchMyProject(projectId), body),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: projectQueryKeys.getMyProjects() }),
        queryClient.invalidateQueries({ queryKey: projectQueryKeys.getMyPendingProjects() }),
        queryClient.invalidateQueries({ queryKey: projectQueryKeys.getMyProject(projectId) }),
      ]);
    },
  });
};
