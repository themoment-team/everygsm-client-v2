import { useMutation, useQueryClient } from '@tanstack/react-query';

import { adminQueryKeys, adminUrl, patch } from '@/shared/api';

export const useAdminRejectProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ projectId, reason }: { projectId: number; reason: string }) =>
      patch(adminUrl.patchAdminRejectProject(projectId), { reason }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminQueryKeys.getAdminRequests() });
    },
  });
};
