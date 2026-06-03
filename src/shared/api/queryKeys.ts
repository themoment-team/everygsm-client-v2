export const adminQueryKeys = {
  all: () => ['admin'] as const,
  getAdminRequest: (requestId?: number) => ['admin', 'request', 'detail', requestId] as const,
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
  deleteMyProject: (projectId: number) => ['projects', 'my', 'delete', projectId] as const,
  patchMyProject: (projectId: number) => ['projects', 'my', 'patch', projectId] as const,
  toggleProjectLike: (projectId: number) => ['projects', 'like', 'toggle', projectId] as const,
} as const;

export const authQueryKeys = {
  all: () => ['auth'] as const,
  postSignIn: () => ['auth', 'signin'] as const,
} as const;

export const userQueryKeys = {
  all: () => ['users'] as const,
  getMyInfo: () => ['users', 'userinfo'] as const,
  getUsersSearch: (name: string) => ['users', 'search', name] as const,
} as const;

export const imageQueryKeys = {
  postImageUpload: () => ['post', 'image'] as const,
} as const;
