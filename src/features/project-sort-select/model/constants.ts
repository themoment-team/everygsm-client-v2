import type { ProjectSortType } from './types';

export const PROJECT_SORT_OPTIONS: { value: ProjectSortType; label: string }[] = [
  { value: 'LIKE', label: '좋아요순' },
  { value: 'LATEST', label: '최신순' },
  { value: 'OLDEST', label: '오래된순' },
];
