import { z } from 'zod';

export const ImageUploadSchema = z.object({
  image: z.file('이미지 파일을 선택해주세요'),
});

export const TechStackSchema = z.object({
  stackName: z.string().trim().min(1, '기술 스택을 입력해주세요'),
});

export const ProjectRegistrationSchema = z.object({
  logo: z.string().trim().min(1, '프로젝트 로고파일을 업로드해주세요'),
  title: z.string().trim().min(1, '프로젝트 제목을 입력해주세요'),
  affiliation: z.string().trim().min(1, '소속 동아리 또는 팀명을 입력해주세요'),
  startYear: z
    .number('프로젝트 시작 연도를 입력해주세요')
    .int()
    .min(2017, '프로젝트 시작 연도는 2017년 이후로 입력해주세요')
    .max(new Date().getFullYear(), '프로젝트 시작 연도는 현재 연도까지만 입력할 수 있습니다'),
  participantIds: z.array(z.number()).min(1, '프로젝트 참여자를 추가해주세요'),
  description: z
    .string()
    .trim()
    .min(1, '프로젝트 설명을 입력해주세요')
    .max(200, '프로젝트 설명은 200자 이내로 입력해주세요'),
  prodUrl: z
    .string()
    .trim()
    .min(1, '프로젝트 배포 URL을 입력해주세요')
    .pipe(z.url('올바른 프로젝트 배포 URL을 입력해주세요')),
  techStack: z
    .array(TechStackSchema)
    .min(1, '기술 스택을 선택해주세요')
    .max(50, '기술 스택은 최대 50개까지 입력할 수 있습니다'),
  repository: z
    .array(
      z
        .string()
        .trim()
        .min(1, '깃허브 레포지토리의 URL을 입력해주세요')
        .pipe(z.url('올바른 깃허브 레포지토리 URL을 입력해주세요')),
    )
    .min(1, '깃허브 레포지토리의 URL을 입력해주세요')
    .max(10, '깃허브 레포지토리는 최대 10개까지 입력할 수 있습니다'),
});

export type ImageUploadReqType = z.infer<typeof ImageUploadSchema>;
export type TechStackReqType = z.infer<typeof TechStackSchema>;
export type ProjectRegistrationReqType = z.infer<typeof ProjectRegistrationSchema>;
