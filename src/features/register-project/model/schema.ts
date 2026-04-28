import { z } from 'zod';

export const imageUploadSchema = z.object({
  image: z.file(),
});

export const techStackSchema = z.object({
  stackName: z.string().min(1),
});

export const projectRegistrationSchema = z.object({
  logo: z.string().min(1),
  title: z.string().min(1),
  affiliation: z.string().min(1),
  description: z.string().max(200),
  prodUrl: z.string(),
  techStack: z.array(techStackSchema).min(1),
  repository: z.array(z.string().min(1)),
});

export type ImageUploadReqType = z.infer<typeof imageUploadSchema>;
export type TechStackReqType = z.infer<typeof techStackSchema>;
export type ProjectRegistrationReqType = z.infer<typeof projectRegistrationSchema>;
