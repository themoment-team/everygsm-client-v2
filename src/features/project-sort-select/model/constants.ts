import type { ProjectSortType } from './types';

export const PROJECT_SORT_OPTIONS: { value: ProjectSortType; label: string }[] = [
  { value: 'LIKES', label: '좋아요순' },
  { value: 'NEWEST', label: '최신순' },
  { value: 'OLDEST', label: '오래된순' },
];

export const DEFAULT_PROJECT_SORT: ProjectSortType = 'NEWEST';

export const isProjectSortType = (value?: string | null): value is ProjectSortType =>
  PROJECT_SORT_OPTIONS.some((option) => option.value === value);
