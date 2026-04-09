const normalizeAccountRole = (role?: string) => {
  if (!role) {
    return '';
  }

  return role
    .trim()
    .toUpperCase()
    .replace(/^ROLE_/, '');
};

export const isAdminRole = (role?: string) => normalizeAccountRole(role) === 'ADMIN';
