# 📋 코드 컨벤션

## 🏗️ 프로젝트 구조

### Feature-Sliced Design (FSD) 아키텍처

```
src/
├── app/         # Next.js 라우팅, layout, metadata, 라우트 가드
├── views/       # 페이지 조합 (여러 위젯/기능 조합)
├── widgets/     # 재사용 가능한 페이지 섹션 블록
├── features/    # 유저 액션 (폼, 뮤테이션, feature 스키마)
├── entities/    # 도메인 엔티티 (타입, API 함수, 쿼리 훅, 엔티티 UI)
└── shared/      # 공유 클라이언트, 훅, 스토어, 유틸, 상수, 에셋
```

각 슬라이스는 `ui/`, `model/`, `api/`, `lib/` 세그먼트로 나뉩니다.

- `ui/`: 컴포넌트
- `model/`: 타입, 쿼리/뮤테이션 훅, 스키마, 상수
- `api/`: 서버 fetch 함수 (`index.server.ts`로 노출)
- `lib/`: 슬라이스 전용 유틸

> 📚 **학습 자료**
>
> - [Feature-Sliced Design 공식 문서](https://feature-sliced.design/)
> - [FSD 한글 번역 문서](https://feature-sliced.design/kr/)

### 계층별 의존성 규칙

- `app` → `views` → `widgets` → `features` → `entities` → `shared`
- 상위 계층은 하위 계층만 import 가능
- 같은 계층 간 import 금지

## 🗂️ 파일/폴더 네이밍

| 구분             | 네이밍 규칙 | 예시                                  |
| ---------------- | ----------- | ------------------------------------- |
| 슬라이스 폴더    | kebab-case  | `project-form/`, `like-project/`      |
| 컴포넌트 파일    | PascalCase  | `ui/ProjectCard.tsx`, `ui/Header.tsx` |
| 유틸리티/훅 파일 | camelCase   | `useDebounce.ts`, `cn.ts`             |
| 상수 파일        | camelCase   | `cookies.ts`, `navigation.ts`         |
| 타입 파일        | camelCase   | `types.ts`                            |
| 스키마 파일      | camelCase   | `schema.ts`                           |
| 에셋 파일        | PascalCase  | `Logo.tsx`, `ArrowIcon.tsx`           |

> 📚 **학습 자료**
>
> - [JavaScript 네이밍 컨벤션 가이드](https://www.robinwieruch.de/javascript-naming-conventions/)
> - [camelCase vs PascalCase 설명](https://www.freecodecamp.org/news/snake-case-vs-camel-case-vs-pascal-case-vs-kebab-case-whats-the-difference/)

## 📦 Import/Export 컨벤션

### 배럴 익스포트(Barrel Export)

- 각 슬라이스에 `index.ts`를 두고 `export * from` 또는 `export { default as ... }` 형태로 내보냅니다.
- 클라이언트 모듈은 `index.ts`, 서버 전용 fetch 함수(`api/*`)는 `index.server.ts`로 분리해 내보냅니다.

```ts
// entities/project/index.ts (클라이언트: 타입, 쿼리 훅, 엔티티 UI)
export * from './model/types';
export * from './model/useGetProjects';
export { default as ProjectCard } from './ui/ProjectCard';

// entities/project/index.server.ts (서버 전용 fetch 함수)
export * from './api/getProjects';

// widgets/project-list/index.ts
export { default as ProjectList } from './ui/ProjectList';
```

> 📚 **학습 자료**
>
> - [JavaScript 모듈 시스템 이해하기](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Modules)
> - [배럴 익스포트 패턴 가이드](https://basarat.gitbook.io/typescript/main-1/barrel)

### Import 별칭

- `tsconfig.json`에 경로 별칭을 설정하여 사용합니다.
  - `@/*`: 앱 내부 경로

### Import 순서 (Prettier plugin으로 자동 정렬)

```ts
// 1. React 관련
import { useEffect, useState } from 'react';

// 2. Next.js 관련
import { usePathname, useRouter } from 'next/navigation';

// 3. 외부 라이브러리
import { useMutation, useQuery } from '@tanstack/react-query';

// 4. 내부 import
import { useGetExample } from '@/entities/example';
import { Button, Card } from '@/shared/ui';
import { cn } from '@/shared/utils';
```

## 🏷️ 타입 컨벤션

- 객체 타입: `interface` 사용을 기본으로 합니다.
- 간단한 유니온: `type`을 사용합니다.
- API 값 → 화면 표시 값 매핑: `enum` 대신 `Record<유니온, 메타>` 형태의 const 객체를 사용합니다.
- 타입 네이밍: **PascalCase**
- 타입 접미사: `Type`으로 끝나는 네이밍을 사용합니다. (예: `StatusType`, 응답은 `...ResponseType`, 요청은 `...ReqType`)

```ts
interface ExampleProps {
  isLoading: boolean;
  data: ExampleType[];
}

export type StatusType = 'PENDING' | 'APPROVED' | 'REJECTED' | 'INACTIVE';

// 매핑은 const 객체로 관리
const STATUS_META: Record<StatusType, { label: string }> = {
  PENDING: { label: '확인 중' },
  APPROVED: { label: '승인' },
  REJECTED: { label: '거절' },
  INACTIVE: { label: '비활성' },
};
```

> 📚 **학습 자료**
>
> - [TypeScript 핸드북 - Interface vs Type](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces)
> - [TypeScript 기본 타입 가이드](https://www.typescriptlang.org/ko/docs/handbook/2/everyday-types.html)

## 📝 Zod 스키마 컨벤션

- 스키마 네이밍: `<이름>Schema` 형태를 사용합니다. (PascalCase)
- 폼/요청 타입 추론: `z.infer<typeof schema>`를 사용하며, 추론 타입은 `...ReqType` 접미사를 붙입니다.

```ts
export const ProjectRegistrationSchema = z.object({
  title: z.string().trim().min(1, '프로젝트 제목을 입력해주세요'),
  description: z.string().trim().min(1).max(200),
});

export type ProjectRegistrationReqType = z.infer<typeof ProjectRegistrationSchema>;
```

> 📚 **학습 자료**
>
> - [Zod 공식 문서](https://zod.dev/)
> - [Zod 한글 가이드](https://github.com/colinhacks/zod/blob/main/packages/docs-v3/README_KO.md)

## 🧩 컴포넌트 컨벤션

- 컴포넌트는 기본적으로 **화살표 함수(Arrow Function)** 로 작성합니다.
- 컴포넌트는 기본적으로 `default export` 로 내보냅니다.
- `props`는 **구조 분해 할당**으로 전달받습니다.
- **변수/훅으로 가져온 값**은 컴포넌트 상단에 위치합니다.
- **핸들러 함수 및 기타 로직**은 "변수 선언"과 `useEffect` 사이에 위치합니다.
- `useEffect`는 `return` 바로 위에 위치합니다.
- 객체 타입 선언은 기본적으로 `interface`를 사용합니다.

```tsx
interface ExamplePageProps {
  data: ExampleDataType | undefined;
  isLoading: boolean;
}

const ExamplePage = ({ data, isLoading }: ExamplePageProps) => {
  // 1. 변수/훅 선언
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data: fetchedData } = useGetExample();

  // 2. 핸들러 함수 및 기타 로직
  const handleClick = () => {
    setIsOpen(true);
  };

  // 3. useEffect
  useEffect(() => {
    // ...
  }, []);

  // 4. return
  return <div>...</div>;
};

export default ExamplePage;
```

> 📚 **학습 자료**
>
> - [JavaScript 구조 분해 할당 기본](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
> - [React Props 구조 분해 할당 패턴](https://react.dev/learn#sharing-data-between-components)

## 🎨 스타일링 컨벤션

- **Tailwind CSS 4**를 사용합니다.
- `clsx` + `tailwind-merge` 기반의 `cn()` 유틸리티를 사용합니다.
- 클래스명은 가능한 한 **하나의 문자열**로 관리합니다.
- 반복되는 클래스명은 슬라이스의 `ui/styles.ts`에 className 상수로 분리합니다.

```ts
// cn() 기본 사용
className={cn('flex gap-2 items-center')}

// 조건부 클래스
className={cn('flex gap-2', isActive && 'bg-primary')}

// 여러 조건 조합
className={cn('flex gap-2 items-center', isActive && 'bg-primary', isDisabled && 'opacity-50')}

// styles.ts 로 분리한 공용 className 상수
export const labelClassName = 'text-base font-medium text-[#DDD]';
```

> 📚 **학습 자료**
>
> - [Tailwind CSS 공식 문서](https://tailwindcss.com/docs/installation/using-vite)

## 🔗 API 컨벤션

- React Query(TanStack Query)를 사용합니다.

### 훅 네이밍

- GET: `useGet<리소스명>` (예: `useGetExample`, `useGetExamples`)
- POST: `usePost<리소스명>` (예: `usePostExample`)
- PATCH: `usePatch<리소스명>` (예: `usePatchExample`)
- PUT: `usePut<리소스명>` (예: `usePutExample`)
- DELETE: `useDelete<리소스명>` (예: `useDeleteExample`)

### Query Keys

- 도메인별 객체로 관리하고 `as const`로 타입을 고정합니다.
- `all()`을 두고 키를 계층 배열로 구성해 정밀 무효화가 가능하게 합니다. 뮤테이션 키는 필요한 경우에만 추가합니다.

```ts
export const projectQueryKeys = {
  all: () => ['projects'] as const,
  getProjects: () => ['projects', 'list'] as const,
  getMyProjects: () => ['projects', 'my', 'list'] as const,
  getMyProject: (projectId?: number) => ['projects', 'my', 'detail', projectId] as const,
} as const;
```

### URL Controller

- 도메인별 객체로 URL 경로를 관리합니다. (실제 API 버전: `/api/v2`)

```ts
export const projectUrl = {
  getProjects: () => '/api/v2/projects',
  getMyProject: (id?: number) => `/api/v2/projects/my/${id}`,
  postProjectRegistration: () => '/api/v2/projects/registration',
  deleteMyProject: (projectId: number) => `/api/v2/projects/my/${projectId}`,
} as const;
```

### 서버 / 클라이언트 fetch 분리

- 서버 컴포넌트의 데이터 로딩: `src/shared/api/fetcher.ts`의 `apiFetcher` (`server-only`, 쿠키 토큰 주입).
- 브라우저 요청: `src/shared/lib/axios.ts`의 `axiosInstance` (인터셉터로 토큰 주입 / 401 처리).
- 라우트에서 서버 fetch한 데이터는 클라이언트 쿼리의 `initialData`로 주입해 재사용합니다.

### HTTP 메서드 래퍼

- `axiosInstance` 기반 `get / post / patch / put / del` 래퍼를 사용합니다.

```ts
export const get = async <T>(...args: Parameters<typeof axiosInstance.get>) =>
  await axiosInstance.get<T, T>(...args);

export const post = async <T>(...args: Parameters<typeof axiosInstance.post>) =>
  await axiosInstance.post<T, T>(...args);

export const del = async <T>(...args: Parameters<typeof axiosInstance.delete>) =>
  await axiosInstance.delete<T, T>(...args);
```

> 📚 **학습 자료**
>
> - [TanStack Query 공식 문서](https://tanstack.com/query/latest/docs/framework/react/overview)
> - [TanStack Query 한글 문서](https://react-query.kro.kr/docs/getting-started)
