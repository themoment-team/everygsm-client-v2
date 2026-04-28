import { useMutation, useQueryClient } from '@tanstack/react-query';

import { adminQueryKeys, adminUrl, patch } from '@/shared/api';

export const useAdminApproveProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (projectId: number) => patch(adminUrl.patchAdminApproveProject(projectId)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminQueryKeys.getAdminRequests() });
    },
  });
};
