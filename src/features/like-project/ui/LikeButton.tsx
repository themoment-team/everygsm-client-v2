'use client';

import { useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { MyProjectsListResponseType, ProjectsListResponseType } from '@/entities/project';
import { projectQueryKeys } from '@/shared/api';
import { LikeIcon } from '@/shared/assets';
import { COOKIE_KEYS } from '@/shared/constants';
import { getCookie } from '@/shared/utils';

import { useToggleProjectLike } from '../model/useToggleProjectLike';

interface LikeButtonProps {
  isLiked: boolean;
  projectId: number;
}

const LikeButton = ({ isLiked, projectId }: LikeButtonProps) => {
  const [localIsLiked, setLocalIsLiked] = useState(isLiked);
  const queryClient = useQueryClient();
  const isLoggedIn = Boolean(getCookie(COOKIE_KEYS.ACCESS_TOKEN));

  const updateProjectsListLike = (
    old: ProjectsListResponseType | undefined,
    currentIsLiked: boolean,
  ) => {
    if (!old) return old;

    return {
      ...old,
      data: {
        ...old.data,
        projects: old.data.projects.map((p) =>
          p.projectId === projectId ? { ...p, liked: !currentIsLiked } : p,
        ),
      },
    };
  };

  const updateMyProjectsLike = (
    old: MyProjectsListResponseType | undefined,
    currentIsLiked: boolean,
  ) => {
    if (!old) return old;

    return {
      ...old,
      data: {
        ...old.data,
        liked: old.data.liked.map((p) =>
          p.projectId === projectId ? { ...p, liked: !currentIsLiked } : p,
        ),
        registered: old.data.registered.map((p) =>
          p.projectId === projectId ? { ...p, liked: !currentIsLiked } : p,
        ),
      },
    };
  };

  const { mutate: toggleLike } = useToggleProjectLike(projectId, {
    onMutate: () => setLocalIsLiked((prev) => !prev), // 낙관적 업데이트: 좋아요 상태를 즉시 반전
    onError: () => setLocalIsLiked((prev) => !prev), // 에러 발생 시 직전 상태로 롤백
    onSuccess: (_, currentIsLiked) => {
      queryClient.setQueriesData<ProjectsListResponseType>(
        { queryKey: projectQueryKeys.getProjectsList() },
        (old) => updateProjectsListLike(old, currentIsLiked),
      );
      queryClient.setQueryData<MyProjectsListResponseType>(
        projectQueryKeys.getMyProjects(),
        (old) => updateMyProjectsLike(old, currentIsLiked),
      );
      queryClient.setQueryData<ProjectsListResponseType>(
        projectQueryKeys.getMyPendingProjects(),
        (old) => updateProjectsListLike(old, currentIsLiked),
      );
      queryClient.setQueryData<ProjectsListResponseType>(
        projectQueryKeys.getMyRejectedProjects(),
        (old) => updateProjectsListLike(old, currentIsLiked),
      );
    },
  });

  const handleClick = () => {
    if (!isLoggedIn) {
      toast.warning('로그인이 필요한 기능입니다.');
      return;
    }
    toggleLike(localIsLiked);
  };

  return <LikeIcon isLiked={localIsLiked} onClick={handleClick} />;
};

export default LikeButton;
