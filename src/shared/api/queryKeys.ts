export const adminQueryKeys = {
  all: () => ['admin'] as const,
  getAdminRequests: () => ['admin', 'requests', 'list'] as const,
  getAdminRequest: (requestId?: number) => ['admin', 'request', 'detail', requestId] as const,
} as const;

export const projectQueryKeys = {
  all: () => ['projects'] as const,
  getProjects: () => ['projects', 'list'] as const,
  getMyProjects: () => ['projects', 'my', 'list'] as const,
  getMyProject: (projectId?: number) => ['projects', 'my', 'detail', projectId] as const,
  getMyRejectedProjects: () => ['projects', 'my', 'rejected'] as const,
  getMyPendingProjects: () => ['projects', 'my', 'pending'] as const,
} as const;

export const userQueryKeys = {
  all: () => ['users'] as const,
  getMyInfo: () => ['users', 'userinfo'] as const,
  getUsersSearch: (name: string) => ['users', 'search', name] as const,
} as const;
