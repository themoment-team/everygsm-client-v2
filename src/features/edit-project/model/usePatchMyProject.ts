import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ProjectFormReqType } from '@/entities/project';
import { patch, projectQueryKeys, projectUrl } from '@/shared/api';

type PatchProjectParams = { projectId: number } & ProjectFormReqType;

export const usePatchMyProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: projectQueryKeys.patchMyProject(0),
    mutationFn: ({ projectId, ...body }: PatchProjectParams) =>
      patch(projectUrl.patchMyProject(projectId), body),
    onSuccess: (_, { projectId }) => {
      queryClient.invalidateQueries({ queryKey: projectQueryKeys.getMyProjects() });
      queryClient.invalidateQueries({ queryKey: projectQueryKeys.getMyPendingProjects() });
      queryClient.invalidateQueries({ queryKey: projectQueryKeys.getMyProject(projectId) });
    },
  });
};
