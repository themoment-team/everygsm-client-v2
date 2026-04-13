import { Suspense } from 'react';

import { getProjects } from '@/entities/project/index.server';
import { getMyInfo } from '@/entities/user/index.server';
import { SuspenseFallback } from '@/shared/ui';
import { HomePage } from '@/views/home';

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
