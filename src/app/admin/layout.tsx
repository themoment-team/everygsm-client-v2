import { ReactNode } from 'react';

import { redirect } from 'next/navigation';

import type { Metadata } from 'next';

import { isAdminRole } from '@/entities/user';
import { getMyInfo } from '@/entities/user/index.server';
import { AdminClientGuard } from '@/views/admin';

export const metadata: Metadata = {
  title: '관리자',
  robots: { index: false, follow: false },
};

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
