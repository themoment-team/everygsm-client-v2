import { useMutation, useQueryClient } from '@tanstack/react-query';

import { del, projectQueryKeys, projectUrl } from '@/shared/api';

export const useDeleteMyProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (projectId: number) => del(projectUrl.deleteMyProject(projectId)),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: projectQueryKeys.getMyProjects() }),
        queryClient.invalidateQueries({ queryKey: projectQueryKeys.getMyPendingProjects() }),
        queryClient.invalidateQueries({ queryKey: projectQueryKeys.getMyRejectedProjects() }),
        queryClient.invalidateQueries({ queryKey: projectQueryKeys.getProjectsList() }),
      ]);
    },
  });
};
