import { MyProjectsListResponseType, ProjectsListResponseType } from '@/entities/project';

export const myProjectsMockData: MyProjectsListResponseType = {
  status: 'OK',
  code: 200,
  message: 'OK',
  data: {
    liked: [
      {
        projectId: 101,
        logo: '/images/example.jpg',
        title: 'EveryGSM',
        affiliation: 'The Moment',
        description: 'GSM 프로젝트를 한 곳에서 탐색하고 공유하는 서비스입니다.',
        prodUrl: 'https://everygsm.com',
        status: 'APPROVED',
        reason: '',
        createdAt: '2026-03-10T09:00:00.000Z',
        techStack: [
          { stackName: 'Next.js' },
          { stackName: 'TypeScript' },
          { stackName: 'TailwindCSS' },
        ],
        repository: [
          {
            repoName: 'EveryGSM-client-v2',
            repoUrl: 'https://github.com/themoment-team/EveryGSM-client-v2',
          },
        ],
        liked: true,
      },
      {
        projectId: 102,
        logo: '/images/example.jpg',
        title: 'HelloGSM',
        affiliation: 'The Moment',
        description: '입학 관련 정보를 빠르게 확인할 수 있는 플랫폼입니다.',
        prodUrl: 'https://hellogsm.kr',
        status: 'APPROVED',
        reason: '',
        createdAt: '2026-03-08T09:00:00.000Z',
        techStack: [{ stackName: 'Next.js' }, { stackName: 'React Query' }, { stackName: 'Zod' }],
        repository: [
          {
            repoName: 'hellogsm-client',
            repoUrl: 'https://github.com/themoment-team/hellogsm-client',
          },
        ],
        liked: true,
      },
    ],
    registered: [
      {
        projectId: 201,
        logo: '/images/example.jpg',
        title: 'DormitoryMate',
        affiliation: 'GSM Team',
        description: '기숙사 생활 편의를 위한 커뮤니티 서비스입니다.',
        prodUrl: 'https://dormitorymate.example.com',
        status: 'APPROVED',
        reason: '',
        createdAt: '2026-03-05T09:00:00.000Z',
        techStack: [{ stackName: 'React' }, { stackName: 'TypeScript' }, { stackName: 'Node.js' }],
        repository: [
          {
            repoName: 'dormitorymate',
            repoUrl: 'https://github.com/example/dormitorymate',
          },
        ],
        liked: false,
      },
      {
        projectId: 202,
        logo: '/images/example.jpg',
        title: 'MealBoard',
        affiliation: 'Lunch Club',
        description: '급식/식단 정보를 공유하는 학교 커뮤니티입니다.',
        prodUrl: 'https://mealboard.example.com',
        status: 'APPROVED',
        reason: '',
        createdAt: '2026-03-04T09:00:00.000Z',
        techStack: [{ stackName: 'Next.js' }, { stackName: 'Prisma' }, { stackName: 'PostgreSQL' }],
        repository: [
          {
            repoName: 'mealboard',
            repoUrl: 'https://github.com/example/mealboard',
          },
        ],
        liked: false,
      },
    ],
  },
};

export const myPendingProjectsMockData: ProjectsListResponseType = {
  status: 'OK',
  code: 200,
  message: 'OK',
  data: {
    projects: [
      {
        projectId: 301,
        logo: '/images/example.jpg',
        title: 'StudyFlow',
        affiliation: 'Dev Club',
        description: '스터디 일정과 학습 기록을 관리하는 서비스입니다.',
        prodUrl: 'https://studyflow.example.com',
        status: 'PENDING',
        reason: '',
        createdAt: '2026-03-15T13:52:04.312Z',
        techStack: [{ stackName: 'Next.js' }, { stackName: 'TypeScript' }],
        repository: [
          {
            repoName: 'studyflow',
            repoUrl: 'https://github.com/example/studyflow',
          },
        ],
        liked: false,
      },
      {
        projectId: 302,
        logo: '/images/example.jpg',
        title: 'TeamPlanner',
        affiliation: 'PM Circle',
        description: '팀 프로젝트 협업을 위한 일정 관리 도구입니다.',
        prodUrl: 'https://teamplanner.example.com',
        status: 'PENDING',
        reason: '',
        createdAt: '2026-03-14T13:52:04.312Z',
        techStack: [{ stackName: 'React' }, { stackName: 'Vite' }],
        repository: [
          {
            repoName: 'teamplanner',
            repoUrl: 'https://github.com/example/teamplanner',
          },
        ],
        liked: true,
      },
    ],
  },
};

export const myRejectedProjectsMockData: ProjectsListResponseType = {
  status: 'OK',
  code: 200,
  message: 'OK',
  data: {
    projects: [
      {
        projectId: 401,
        logo: '/images/example.jpg',
        title: 'CampusMap',
        affiliation: 'Map Team',
        description: '교내 시설 위치를 안내하는 지도 서비스입니다.',
        prodUrl: 'https://campusmap.example.com',
        status: 'REJECTED',
        reason: '서비스 소개가 부족합니다.',
        createdAt: '2026-03-13T13:52:04.327Z',
        techStack: [{ stackName: 'Next.js' }, { stackName: 'Leaflet' }],
        repository: [
          {
            repoName: 'campusmap',
            repoUrl: 'https://github.com/example/campusmap',
          },
        ],
        liked: false,
      },
      {
        projectId: 402,
        logo: '/images/example.jpg',
        title: 'ClubHub',
        affiliation: 'Community Team',
        description: '동아리 활동을 기록하고 공유하는 플랫폼입니다.',
        prodUrl: 'https://clubhub.example.com',
        status: 'REJECTED',
        reason: '프로젝트 설명과 링크 확인이 필요합니다.',
        createdAt: '2026-03-12T13:52:04.327Z',
        techStack: [{ stackName: 'Next.js' }, { stackName: 'TanStack Query' }],
        repository: [
          {
            repoName: 'clubhub',
            repoUrl: 'https://github.com/example/clubhub',
          },
        ],
        liked: true,
      },
    ],
  },
};
