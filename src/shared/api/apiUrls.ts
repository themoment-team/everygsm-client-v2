export const adminUrl = {
  getAdminRequests: () => '/api/v2/admin/requests',
  getAdminRequest: (id: number) => `/api/v2/admin/requests/${id}`,
  patchAdminRejectProject: (projectId: number) => `/api/v2/admin/reject/${projectId}`,
  patchAdminApproveProject: (projectId: number) => `/api/v2/admin/approve/${projectId}`,
} as const;

export const authUrl = {
  postSignIn: () => '/api/v2/auth/signin',
} as const;

export const userUrl = {
  getMyInfo: () => '/api/v2/users/me',
  getUsersSearch: (name: string) => `/api/v2/users/search?name=${encodeURIComponent(name)}`,
} as const;

export const projectUrl = {
  deleteMyProject: (projectId: number) => `/api/v2/projects/my/${projectId}`,
  deleteProjectLike: (projectId: number) => `/api/v2/projects/like/${projectId}`,
  getProjects: () => '/api/v2/projects',
  getMyProjects: () => '/api/v2/projects/my',
  getMyProject: (id?: number) => `/api/v2/projects/my/${id}`,
  getMyRejectedProjects: () => '/api/v2/projects/my/rejected',
  getMyPendingProjects: () => '/api/v2/projects/my/pending',
  postProjectRegistration: () => '/api/v2/projects/registration',
  postProjectLike: (projectId: number) => `/api/v2/projects/like/${projectId}`,
} as const;

export const imageUrl = {
  postImageUpload: () => '/api/v2/images',
} as const;
