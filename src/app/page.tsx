import { Suspense } from 'react';

import type { Metadata } from 'next';

import { getProjects } from '@/entities/project/index.server';
import { getMyInfo } from '@/entities/user/index.server';
import { SuspenseFallback } from '@/shared/ui';
import { HomePage } from '@/views/home';

export const metadata: Metadata = {
  description: 'GSM 학생들이 만든 프로젝트를 한눈에 확인하세요.',
  alternates: {
    canonical: '/',
  },
};

const Home = async () => {
  const [initialUserInfoData, initialProjectsData] = await Promise.all([
    getMyInfo(),
    getProjects(),
  ]);

  return (
    <Suspense fallback={<SuspenseFallback />}>
      <HomePage
        initialUserInfoData={initialUserInfoData}
        initialProjectsData={initialProjectsData}
      />
    </Suspense>
  );
};

export default Home;
