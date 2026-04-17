export const adminQueryKeys = {
  all: () => ['admin'] as const,
  getAdminRequests: () => ['admin', 'requests', 'list'] as const,
  patchAdminRejectProject: (projectId: number) => ['admin', 'reject', projectId] as const,
  patchAdminApproveProject: (projectId: number) => ['admin', 'approve', projectId] as const,
} as const;

export const projectQueryKeys = {
  all: () => ['projects'] as const,
  getProjects: () => ['projects', 'list'] as const,
  getMyProjects: () => ['projects', 'my', 'list'] as const,
  getMyProject: (projectId?: number) => ['projects', 'my', 'detail', projectId] as const,
  getMyRejectedProjects: () => ['projects', 'my', 'rejected'] as const,
  getMyPendingProjects: () => ['projects', 'my', 'pending'] as const,
  postProjectRegistration: () => ['projects', 'create'] as const,
  postProjectLogo: () => ['post', 'image'] as const,
  toggleProjectLike: (projectId: number) => ['projects', 'like', 'toggle', projectId] as const,
} as const;

export const authQueryKeys = {
  all: () => ['auth'] as const,
  postSignIn: () => ['auth', 'signin'] as const,
  getMyInfo: () => ['auth', 'userinfo'] as const,
} as const;

export const imageQueryKeys = {
  postImageUpload: () => ['post', 'image'] as const,
} as const;
