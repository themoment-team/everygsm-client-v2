import { redirect } from 'next/navigation';

import { isAdminRole } from '@/entities/auth';
import { getMyInfo } from '@/entities/user/index.server';

export const requireAdmin = async () => {
  const userResponse = await getMyInfo();

  if (!isAdminRole(userResponse?.data.role)) {
    redirect('/');
  }
};
