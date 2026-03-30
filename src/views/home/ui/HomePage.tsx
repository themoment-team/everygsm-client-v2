'use client';

import { useEffect } from 'react';

import { toast } from 'sonner';

import { useGetUserInfo, UserInfoResponseType } from '@/entities/auth';
import { ProjectsListResponseType, useGetProjects } from '@/entities/project';
import { COOKIE_KEYS } from '@/shared/constants';
import { useHandleErrorQueryToast } from '@/shared/hooks';
import { cn, getCookie } from '@/shared/utils';
import { HeroSection } from '@/widgets/hero-section';
import { ProjectList } from '@/widgets/project-list';

interface HomePageProps {
  initialUserInfoData?: UserInfoResponseType;
  initialProjectsData?: ProjectsListResponseType;
}

const HomePage = ({ initialUserInfoData, initialProjectsData }: HomePageProps) => {
  const hasAccessToken = Boolean(getCookie(COOKIE_KEYS.ACCESS_TOKEN));

  const { data: userInfoData } = useGetUserInfo({
    initialData: initialUserInfoData,
    enabled: hasAccessToken,
  });
  const { data: projectsData } = useGetProjects({ initialData: initialProjectsData });

  const isLoggedIn = Boolean(userInfoData?.data?.id);
  const projects = projectsData?.data.projects ?? [];

  useHandleErrorQueryToast({
    errorType: 'forbidden-admin',
    message: '관리자 권한이 필요한 페이지입니다.',
  });

  useEffect(() => {
    if (sessionStorage.getItem('login_success')) {
      toast.success('로그인에 성공했습니다.');
      sessionStorage.removeItem('login_success');
    }

    if (sessionStorage.getItem('login_error')) {
      toast.error('로그인에 실패했습니다.');
      sessionStorage.removeItem('login_error');
    }
  }, []);

  return (
    <main className="min-h-[calc(100vh-72px)] bg-[#191919]">
      <div className={cn('flex flex-col gap-y-10 px-15 py-10')}>
        <HeroSection
          title={`GSM의 프로젝트를 한 눈에,\nEveryGSM에서 간편하게 확인해보세요!`}
          description={`EveryGSM은 GSM의 프로젝트들을 한 곳에 모아 트래픽을 집중시키기 위한 서비스로,\n사용자가 GSM의 사이트를 보다 쉽게 방문하기 위해 만들어졌습니다.`}
        />
        <ProjectList projects={projects} showRegisterCard={isLoggedIn} />
      </div>
    </main>
  );
};

export default HomePage;
