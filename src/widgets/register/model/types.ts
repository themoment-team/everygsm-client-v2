import { z } from 'zod';

export const RegisterFormSchema = z.object({
  logo: z.string().min(1, '프로젝트 로고파일을 업로드해주세요'),
  title: z.string().min(1, '프로젝트 제목을 입력해주세요'),
  affiliation: z.string().min(1, '소속 동아리 또는 팀명을 입력해주세요'),
  description: z
    .string()
    .min(1, '프로젝트 설명을 입력해주세요')
    .max(200, '프로젝트 설명은 최대 200자까지 입력할 수 있습니다.'),
  techStack: z
    .array(
      z.object({
        stackName: z.string().min(1, '기술 스택을 입력해주세요'),
      }),
    )
    .max(50, '기술 스택은 최대 50개까지 추가할 수 있습니다.'),
  repository: z
    .array(
      z.object({
        repoUrl: z.string().min(1, '깃허브 레포지토리의 URL을 입력해주세요'),
      }),
    )
    .max(10, 'GitHub 레포지토리는 최대 10개까지 추가할 수 있습니다.'),
  prodUrl: z.string().min(1, '프로젝트 배포 URL을 입력해주세요'),
});

export type RegisterFormSchemaType = z.infer<typeof RegisterFormSchema>;
