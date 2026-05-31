import { useMutation, useQueryClient } from '@tanstack/react-query';

import { patch, projectQueryKeys, projectUrl } from '@/shared/api';

export interface EditProjectReqType {
  logo: string;
  title: string;
  affiliation: string;
  startYear: number;
  participantIds: number[];
  description: string;
  prodUrl: string;
  techStack: { stackName: string }[];
  repository: string[];
}

type PatchProjectParams = { projectId: number } & EditProjectReqType;

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
