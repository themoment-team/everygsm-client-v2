'use client';

import { ReactNode, useEffect, useRef } from 'react';

import { useRouter } from 'next/navigation';

import { isAdminRole, useGetMyInfo, UserInfoResponseType } from '@/entities/auth';

interface AdminClientGuardProps {
  children: ReactNode;
  initialUserInfoData?: UserInfoResponseType;
}

const AdminClientGuard = ({ children, initialUserInfoData }: AdminClientGuardProps) => {
  const hasRedirectedRef = useRef(false);
  const router = useRouter();
  const { data: userInfoData, isPending: isUserInfoPending } = useGetMyInfo({
    initialData: initialUserInfoData,
    retry: false,
  });

  const accountRole = userInfoData?.data.role;
  const isAdminAccount = isAdminRole(accountRole);

  useEffect(() => {
    if (isUserInfoPending || isAdminAccount || hasRedirectedRef.current) {
      return;
    }

    hasRedirectedRef.current = true;
    router.replace('/?error=forbidden-admin');
  }, [isUserInfoPending, isAdminAccount, router]);

  if (!isAdminAccount) {
    return null;
  }

  return children;
};

export default AdminClientGuard;
