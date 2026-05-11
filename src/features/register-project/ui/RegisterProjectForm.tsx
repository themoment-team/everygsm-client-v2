'use client';

import {
  type ChangeEvent,
  type InputEvent,
  type KeyboardEvent,
  type MouseEvent,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { type SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { toast } from 'sonner';

import { cn } from '@/shared/utils';

import { resizeTextarea } from '../lib/resizeTextarea';
import { DEFAULT_TECH_STACKS } from '../model/constants';
import { type ProjectRegistrationReqType, projectRegistrationSchema } from '../model/schema';
import { usePostImageUpload } from '../model/usePostImageUpload';
import { usePostProjectRegistration } from '../model/usePostProjectRegistration';
import LogoUploadField from './LogoUploadField';
import RepositoryUrlField from './RepositoryUrlField';
import TechStackField from './TechStackField';
import TextareaField from './TextareaField';
import TextField from './TextField';

const MAX_TECH_STACK_COUNT = 50;
const MAX_REPOSITORY_COUNT = 10;

const RegisterProjectForm = () => {
  const router = useRouter();
  const descriptionTextareaRef = useRef<HTMLTextAreaElement>(null);
  const [customTechStacks, setCustomTechStacks] = useState<string[]>([]);
  const [techStackInput, setTechStackInput] = useState('');
  const [logoFileName, setLogoFileName] = useState('');
  const [logoInputKey, setLogoInputKey] = useState(0);
  const [hasSubmittedSuccessfully, setHasSubmittedSuccessfully] = useState(false);
  const currentYear = new Date().getFullYear();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting: isFormSubmitting, isValid },
  } = useForm<ProjectRegistrationReqType>({
    resolver: zodResolver(projectRegistrationSchema),
    mode: 'onChange',
    defaultValues: {
      logo: '',
      title: '',
      affiliation: '',
      description: '',
      prodUrl: '',
      startYear: currentYear,
      techStack: [],
      repository: [],
    },
  });
  const { mutateAsync: uploadImage, isPending: isImageUploading } = usePostImageUpload();
  const { mutateAsync: postProjectRegistration } = usePostProjectRegistration();
  const selectedTechStackValues = useWatch({ control, name: 'techStack' }) ?? [];
  const repositoryUrls = useWatch({ control, name: 'repository' }) ?? [];
  const logo = useWatch({ control, name: 'logo' });
  const selectedTechStacks = selectedTechStackValues.map((stack) => stack.stackName);
  const isSubmitDisabled = isImageUploading || isFormSubmitting || hasSubmittedSuccessfully;
  const hasUploadedLogo = Boolean(logo && logoFileName);
  const descriptionField = register('description');
  const repositoryItemErrorMessage = Array.isArray(errors.repository)
    ? errors.repository.find((error) => error?.message)?.message
    : undefined;
  const repositoryErrorMessage =
    errors.repository && 'message' in errors.repository
      ? errors.repository.message
      : repositoryItemErrorMessage;

  useLayoutEffect(() => {
    if (!descriptionTextareaRef.current) return;

    resizeTextarea(descriptionTextareaRef.current);
  }, []);

  const handleDescriptionInput = (event: InputEvent<HTMLTextAreaElement>) => {
    resizeTextarea(event.currentTarget);
  };

  const syncTechStacks = (stackNames: string[]) => {
    setValue(
      'techStack',
      stackNames.map((stackName) => ({ stackName })),
      { shouldDirty: true, shouldValidate: true },
    );
  };

  const toggleTechStack = (stack: string) => {
    if (selectedTechStacks.includes(stack)) {
      syncTechStacks(selectedTechStacks.filter((selectedTechStack) => selectedTechStack !== stack));
      return;
    }

    if (selectedTechStacks.length >= MAX_TECH_STACK_COUNT) return;

    syncTechStacks([...selectedTechStacks, stack]);
  };

  const addCustomTechStack = () => {
    const trimmedTechStack = techStackInput.trim();
    if (!trimmedTechStack) return;
    if (selectedTechStacks.includes(trimmedTechStack)) {
      setTechStackInput('');
      return;
    }
    if (selectedTechStacks.length >= MAX_TECH_STACK_COUNT) return;

    const isDefaultTechStack = DEFAULT_TECH_STACKS.some((stack) => stack === trimmedTechStack);

    syncTechStacks([...selectedTechStacks, trimmedTechStack]);

    if (isDefaultTechStack) {
      setTechStackInput('');
      return;
    }

    setCustomTechStacks((prevCustomTechStacks) => {
      if (prevCustomTechStacks.includes(trimmedTechStack)) return prevCustomTechStacks;

      return [...prevCustomTechStacks, trimmedTechStack];
    });
    setTechStackInput('');
  };

  const removeCustomTechStack = (stack: string) => {
    setCustomTechStacks((prevCustomTechStacks) =>
      prevCustomTechStacks.filter((customTechStack) => customTechStack !== stack),
    );
    syncTechStacks(selectedTechStacks.filter((selectedTechStack) => selectedTechStack !== stack));
  };

  const handleTechStackInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return;

    event.preventDefault();
    addCustomTechStack();
  };
  const hasTechStackInput = techStackInput.trim().length > 0;
  const canAddRepository = repositoryUrls.length < MAX_REPOSITORY_COUNT;

  const addRepositoryInput = () => {
    if (!canAddRepository) return;

    setValue('repository', [...repositoryUrls, ''], { shouldDirty: true });
  };

  const updateRepositoryUrl = (targetIndex: number, value: string) => {
    setValue(
      'repository',
      repositoryUrls.map((repositoryUrl, index) => (index === targetIndex ? value : repositoryUrl)),
      { shouldDirty: true, shouldValidate: true },
    );
  };

  const removeRepositoryInput = (targetIndex: number) => {
    setValue(
      'repository',
      repositoryUrls.filter((_, index) => index !== targetIndex),
      { shouldDirty: true, shouldValidate: true },
    );
  };

  const handleLogoChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const image = event.target.files?.[0];
    if (!image) return;

    setLogoFileName(image.name);

    try {
      const response = await uploadImage({ image });
      setValue('logo', response.data.key, { shouldDirty: true, shouldValidate: true });
    } catch {
      setLogoFileName('');
      setValue('logo', '', { shouldDirty: true, shouldValidate: true });
      event.target.value = '';
      toast.error('이미지 업로드에 실패했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  const handleLogoRemove = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setLogoFileName('');
    setValue('logo', '', { shouldDirty: true, shouldValidate: true });
    setLogoInputKey((prevLogoInputKey) => prevLogoInputKey + 1);
  };

  const handleProjectRegistrationSubmit: SubmitHandler<ProjectRegistrationReqType> = async (
    requestBody,
  ) => {
    if (hasSubmittedSuccessfully) return;

    try {
      await postProjectRegistration(requestBody);
      setHasSubmittedSuccessfully(true);
      router.push('/mypage');
      toast.success('프로젝트 등록 요청이 완료되었습니다.');
    } catch {
      toast.error('프로젝트 등록에 실패했습니다. 입력 정보를 확인해주세요.');
    }
  };

  const handleInvalidProjectRegistrationSubmit = () => {
    toast.warning('프로젝트 등록에 필요한 정보를 확인해주세요.');
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(
        handleProjectRegistrationSubmit,
        handleInvalidProjectRegistrationSubmit,
      )}
      className={cn('flex w-full flex-col gap-y-9')}
    >
      <LogoUploadField
        logoInputKey={logoInputKey}
        logoFileName={logoFileName}
        isImageUploading={isImageUploading}
        hasUploadedLogo={hasUploadedLogo}
        errorMessage={errors.logo?.message}
        onLogoChange={handleLogoChange}
        onLogoRemove={handleLogoRemove}
      />
      <TextField
        id="project-title"
        label="프로젝트 제목"
        placeholder="프로젝트 제목을 입력해주세요"
        registration={register('title')}
        errorMessage={errors.title?.message}
      />
      <TextField
        id="project-affiliation"
        label="소속 동아리 또는 팀명"
        placeholder="프로젝트를 진행한 동아리 또는 팀명을 입력해주세요"
        registration={register('affiliation')}
        errorMessage={errors.affiliation?.message}
      />
      <TextField
        id="project-start-year"
        label="프로젝트 시작 연도"
        placeholder="프로젝트 시작 연도를 입력해주세요"
        type="number"
        registration={register('startYear', {
          valueAsNumber: true,
        })}
        errorMessage={errors.startYear?.message}
      />
      <TextareaField
        id="project-description"
        label="프로젝트 설명"
        placeholder="200자 이내의  프로젝트 설명글을 입력해주세요"
        registration={descriptionField}
        errorMessage={errors.description?.message}
        onInput={handleDescriptionInput}
        onTextareaElementChange={(element) => {
          descriptionTextareaRef.current = element;
        }}
      />
      <TechStackField
        selectedTechStacks={selectedTechStacks}
        customTechStacks={customTechStacks}
        techStackInput={techStackInput}
        hasTechStackInput={hasTechStackInput}
        errorMessage={errors.techStack?.message}
        onToggleTechStack={toggleTechStack}
        onRemoveCustomTechStack={removeCustomTechStack}
        onTechStackInputChange={(event) => setTechStackInput(event.target.value)}
        onTechStackInputKeyDown={handleTechStackInputKeyDown}
        onAddCustomTechStack={addCustomTechStack}
      />
      <RepositoryUrlField
        repositoryUrls={repositoryUrls}
        canAddRepository={canAddRepository}
        errorMessage={repositoryErrorMessage}
        onAddRepositoryInput={addRepositoryInput}
        onUpdateRepositoryUrl={updateRepositoryUrl}
        onRemoveRepositoryInput={removeRepositoryInput}
      />
      <TextField
        id="project-deploy-url"
        label="프로젝트 배포 URL"
        placeholder="프로젝트 배포 URL을 입력해주세요"
        inputMode="url"
        registration={register('prodUrl')}
        errorMessage={errors.prodUrl?.message}
      />

      <button
        type="submit"
        disabled={isSubmitDisabled}
        className={cn(
          'mt-16 w-full rounded-xl bg-[#2C2C2C] px-4 py-6 text-2xl leading-[1.8rem] font-bold tracking-[-0.04rem] text-[#565656] shadow-[0_0_16px_0_rgba(10,6,29,0.25)] disabled:cursor-not-allowed',
          isValid && !hasSubmittedSuccessfully && 'bg-[#FC335A] text-white',
        )}
      >
        {isFormSubmitting ? '프로젝트 등록 중' : '프로젝트 등록'}
      </button>
    </form>
  );
};

export default RegisterProjectForm;
