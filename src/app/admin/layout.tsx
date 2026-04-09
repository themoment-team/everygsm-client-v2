import { ReactNode } from 'react';

import { redirect } from 'next/navigation';

import { isAdminRole } from '@/entities/auth';
import { getMyInfo } from '@/entities/auth/index.server';
import { AdminClientGuard } from '@/views/admin';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = async ({ children }: AdminLayoutProps) => {
  const [initialUserInfoData] = await Promise.all([getMyInfo()]);
  const accountRole = initialUserInfoData?.data.role;
  const isAdminAccount = isAdminRole(accountRole);

  if (!isAdminAccount) {
    redirect('/?error=forbidden-admin');
  }

  return <AdminClientGuard initialUserInfoData={initialUserInfoData}>{children}</AdminClientGuard>;
};

export default AdminLayout;
