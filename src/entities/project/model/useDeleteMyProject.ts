import { useMutation, useQueryClient } from '@tanstack/react-query';

import { del, projectQueryKeys, projectUrl } from '@/shared/api';

export const useDeleteMyProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (projectId: number) => del(projectUrl.deleteMyProject(projectId)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectQueryKeys.getMyProjects() });
    },
  });
};
