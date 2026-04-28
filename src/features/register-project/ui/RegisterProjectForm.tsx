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

import { ArrowIcon, PlusIcon, UploadIcon, XIcon } from '@/shared/assets';
import { cn } from '@/shared/utils';

import { DEFAULT_TECH_STACKS } from '../model/constants';
import { type ProjectRegistrationReqType, projectRegistrationSchema } from '../model/schema';
import { usePostImageUpload } from '../model/usePostImageUpload';
import { usePostProjectRegistration } from '../model/usePostProjectRegistration';

const MAX_TECH_STACK_COUNT = 50;
const MAX_REPOSITORY_COUNT = 10;

const resizeTextarea = (textarea: HTMLTextAreaElement) => {
  textarea.style.height = 'auto';
  textarea.style.height = `${textarea.scrollHeight}px`;
};

interface FieldErrorMessageProps {
  message?: string;
}

const FieldErrorMessage = ({ message }: FieldErrorMessageProps) => {
  if (!message) return null;

  return (
    <p className={cn('text-base leading-[1.2rem] font-medium tracking-[-0.02rem] text-[#FF7C7C]')}>
      {message}
    </p>
  );
};

const RegisterProjectForm = () => {
  const router = useRouter();
  const descriptionTextareaRef = useRef<HTMLTextAreaElement>(null);
  const [customTechStacks, setCustomTechStacks] = useState<string[]>([]);
  const [techStackInput, setTechStackInput] = useState('');
  const [logoFileName, setLogoFileName] = useState('');
  const [logoInputKey, setLogoInputKey] = useState(0);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isValid },
  } = useForm<ProjectRegistrationReqType>({
    resolver: zodResolver(projectRegistrationSchema),
    mode: 'onChange',
    defaultValues: {
      logo: '',
      title: '',
      affiliation: '',
      description: '',
      prodUrl: '',
      techStack: [],
      repository: [],
    },
  });
  const { mutateAsync: uploadImage, isPending: isImageUploading } = usePostImageUpload();
  const { mutateAsync: postProjectRegistration, isPending: isProjectRegistrationPending } =
    usePostProjectRegistration();
  const selectedTechStackValues = useWatch({ control, name: 'techStack' }) ?? [];
  const repositoryUrls = useWatch({ control, name: 'repository' }) ?? [];
  const logo = useWatch({ control, name: 'logo' });
  const selectedTechStacks = selectedTechStackValues.map((stack) => stack.stackName);
  const isSubmitting = isImageUploading || isProjectRegistrationPending;
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
    try {
      await postProjectRegistration(requestBody);
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
      <div className={cn('flex flex-col gap-3')}>
        <label
          htmlFor="project-logo"
          className={cn('text-base leading-[1.2rem] font-medium tracking-[-0.02rem] text-[#DDD]')}
        >
          프로젝트 로고
        </label>

        <label
          htmlFor="project-logo"
          className={cn(
            'flex h-34.5 w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-xl bg-[rgba(34,34,34,0.5)] px-4 py-6 shadow-[inset_0_0_0_1px_#2F2F2F,0_0_16px_0_rgba(10,6,29,0.25)]',
          )}
        >
          <input
            key={logoInputKey}
            id="project-logo"
            name="logoFile"
            type="file"
            accept="image/*"
            onChange={handleLogoChange}
            className={cn('sr-only')}
          />

          {hasUploadedLogo ? (
            <span
              className={cn(
                'flex items-center gap-2.5 rounded-xl bg-[rgba(34,34,34,0.5)] p-4 text-base leading-[1.2rem] font-medium tracking-[-0.03rem] text-white shadow-[inset_0_0_0_1px_#2F2F2F,0_0_32px_0_rgba(10,6,29,0.35)]',
              )}
            >
              {logoFileName}
              <button
                type="button"
                onClick={handleLogoRemove}
                className={cn('cursor-pointer')}
                aria-label="프로젝트 로고 삭제"
              >
                <XIcon />
              </button>
            </span>
          ) : (
            <>
              <p
                className={cn(
                  'text-base leading-[1.2rem] font-medium tracking-[-0.03rem] text-[#9A9A9A]',
                )}
              >
                {isImageUploading
                  ? '이미지를 업로드하고 있습니다'
                  : '파일을 여기에 끌어서 놓거나, 직접 파일을 선택해주세요'}
              </p>

              <span
                className={cn(
                  'flex items-center gap-6 rounded-xl bg-[#191919] px-4 py-3 text-base leading-[1.2rem] font-medium tracking-[-0.03rem] text-[#9A9A9A]',
                )}
              >
                <UploadIcon />
                직접 파일 선택
              </span>
            </>
          )}
        </label>
        <FieldErrorMessage message={errors.logo?.message} />
      </div>
      <div className={cn('flex flex-col gap-3')}>
        <label
          htmlFor="project-title"
          className={cn('text-base leading-[1.2rem] font-medium tracking-[-0.02rem] text-[#DDD]')}
        >
          프로젝트 제목
        </label>

        <input
          id="project-title"
          type="text"
          placeholder="프로젝트 제목을 입력해주세요"
          {...register('title')}
          className={cn(
            'w-full rounded-xl bg-[rgba(34,34,34,0.5)] p-4 text-base leading-[1.2rem] font-medium tracking-[-0.03rem] text-white shadow-[inset_0_0_0_1px_#2F2F2F,0_0_16px_0_rgba(10,6,29,0.25)] outline-none',
            'placeholder:text-base placeholder:leading-[1.2rem] placeholder:font-medium placeholder:tracking-[-0.03rem] placeholder:text-[#9A9A9A]',
          )}
        />
        <FieldErrorMessage message={errors.title?.message} />
      </div>
      <div className={cn('flex flex-col gap-3')}>
        <label
          htmlFor="project-affiliation"
          className={cn('text-base leading-[1.2rem] font-medium tracking-[-0.02rem] text-[#DDD]')}
        >
          소속 동아리 또는 팀명
        </label>

        <input
          id="project-affiliation"
          type="text"
          placeholder="프로젝트를 진행한 동아리 또는 팀명을 입력해주세요"
          {...register('affiliation')}
          className={cn(
            'w-full rounded-xl bg-[rgba(34,34,34,0.5)] p-4 text-base leading-[1.2rem] font-medium tracking-[-0.03rem] text-white shadow-[inset_0_0_0_1px_#2F2F2F,0_0_16px_0_rgba(10,6,29,0.25)] outline-none',
            'placeholder:text-base placeholder:leading-[1.2rem] placeholder:font-medium placeholder:tracking-[-0.03rem] placeholder:text-[#9A9A9A]',
          )}
        />
        <FieldErrorMessage message={errors.affiliation?.message} />
      </div>
      <div className={cn('flex flex-col gap-3')}>
        <label
          htmlFor="project-description"
          className={cn('text-base leading-[1.2rem] font-medium tracking-[-0.02rem] text-[#DDD]')}
        >
          프로젝트 설명
        </label>

        <textarea
          id="project-description"
          placeholder="200자 이내의  프로젝트 설명글을 입력해주세요"
          onInput={handleDescriptionInput}
          {...descriptionField}
          ref={(element) => {
            descriptionField.ref(element);
            descriptionTextareaRef.current = element;
          }}
          className={cn(
            'min-h-34.5 w-full resize-none overflow-hidden rounded-xl bg-[rgba(34,34,34,0.5)] p-4 text-base leading-[1.2rem] font-medium tracking-[-0.03rem] text-white shadow-[inset_0_0_0_1px_#2F2F2F,0_0_16px_0_rgba(10,6,29,0.25)] outline-none',
            'placeholder:text-base placeholder:leading-[1.2rem] placeholder:font-medium placeholder:tracking-[-0.03rem] placeholder:text-[#9A9A9A]',
          )}
        />
        <FieldErrorMessage message={errors.description?.message} />
      </div>
      <div className={cn('flex flex-col gap-3')}>
        <p className={cn('text-base leading-[1.2rem] font-medium tracking-[-0.02rem] text-[#DDD]')}>
          기술 스택
        </p>

        <div
          className={cn(
            'flex w-full flex-wrap gap-x-3 gap-y-4 rounded-xl bg-[rgba(34,34,34,0.5)] p-4 shadow-[inset_0_0_0_1px_#2F2F2F,0_0_16px_0_rgba(10,6,29,0.25)]',
          )}
        >
          {DEFAULT_TECH_STACKS.map((stack) => {
            const isSelected = selectedTechStacks.includes(stack);

            return (
              <button
                key={stack}
                type="button"
                onClick={() => toggleTechStack(stack)}
                className={cn(
                  'rounded-full px-4 py-2 text-base leading-[1.2rem] font-medium tracking-[-0.03rem] text-[#DDD] transition-colors',
                  isSelected ? 'bg-[#FC335A] text-white' : 'bg-[#4F4F4F]',
                )}
              >
                {stack}
              </button>
            );
          })}

          {customTechStacks.map((stack) => (
            <button
              key={stack}
              type="button"
              onClick={() => removeCustomTechStack(stack)}
              className={cn(
                'flex items-center gap-2.5 rounded-full bg-[#FC335A] px-4 py-2 text-base leading-[1.2rem] font-medium tracking-[-0.03rem] text-white transition-colors',
              )}
            >
              {stack}
              <XIcon />
            </button>
          ))}
        </div>
        <FieldErrorMessage message={errors.techStack?.message} />
      </div>

      <div className={cn('flex flex-col gap-3')}>
        <div className={cn('flex items-center gap-3')}>
          <label
            htmlFor="project-tech-stack"
            className={cn('text-base leading-[1.2rem] font-medium tracking-[-0.02rem] text-[#DDD]')}
          >
            기술 스택 추가 입력
          </label>
          <p
            className={cn(
              'text-base leading-[1.2rem] font-medium tracking-[-0.02rem] text-[#6A6A6A]',
            )}
          >
            최대 50개 추가 입력
          </p>
        </div>

        <div
          className={cn(
            'flex w-full items-center rounded-xl bg-[rgba(34,34,34,0.5)] p-4 shadow-[inset_0_0_0_1px_#2F2F2F,0_0_16px_0_rgba(10,6,29,0.25)]',
          )}
        >
          <input
            id="project-tech-stack"
            name="techStack"
            type="text"
            value={techStackInput}
            placeholder="위의 기술 스택 이외에 추가할 기술스택이 있다면 입력해주세요"
            onChange={(event) => setTechStackInput(event.target.value)}
            onKeyDown={handleTechStackInputKeyDown}
            className={cn(
              'w-full text-base leading-[1.2rem] font-medium tracking-[-0.03rem] text-white outline-none',
              'placeholder:text-base placeholder:leading-[1.2rem] placeholder:font-medium placeholder:tracking-[-0.03rem] placeholder:text-[#9A9A9A]',
            )}
          />
          {hasTechStackInput && (
            <button
              type="button"
              onClick={addCustomTechStack}
              className={cn('flex cursor-pointer items-center justify-center')}
              aria-label="기술 스택 추가"
            >
              <ArrowIcon />
            </button>
          )}
        </div>
      </div>
      <div className={cn('flex flex-col gap-3')}>
        <div className={cn('flex items-center gap-3')}>
          <p
            className={cn('text-base leading-[1.2rem] font-medium tracking-[-0.02rem] text-[#DDD]')}
          >
            깃허브 레포지토리
          </p>
          <p
            className={cn(
              'text-base leading-[1.2rem] font-medium tracking-[-0.02rem] text-[#6A6A6A]',
            )}
          >
            최대 10개 입력
          </p>
        </div>

        <div className={cn('flex flex-col gap-3')}>
          {repositoryUrls.map((repositoryUrl, index) => (
            <div
              key={index}
              className={cn(
                'flex w-full items-center rounded-xl bg-[rgba(34,34,34,0.5)] p-4 shadow-[inset_0_0_0_1px_#2F2F2F,0_0_16px_0_rgba(10,6,29,0.25)]',
              )}
            >
              <input
                name="repositoryUrls"
                type="text"
                inputMode="url"
                value={repositoryUrl}
                placeholder="깃허브 레포지토리 URL을 입력해주세요"
                onChange={(event) => updateRepositoryUrl(index, event.target.value)}
                className={cn(
                  'w-full text-base leading-[1.2rem] font-medium tracking-[-0.03rem] text-white outline-none',
                  'placeholder:text-base placeholder:leading-[1.2rem] placeholder:font-medium placeholder:tracking-[-0.03rem] placeholder:text-[#9A9A9A]',
                )}
              />
              <button
                type="button"
                onClick={() => removeRepositoryInput(index)}
                className={cn('flex cursor-pointer items-center justify-center')}
                aria-label="깃허브 레포지토리 삭제"
              >
                <XIcon />
              </button>
            </div>
          ))}

          {canAddRepository && (
            <button
              type="button"
              onClick={addRepositoryInput}
              className={cn(
                'flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl bg-[rgba(34,34,34,0.5)] p-4 text-base leading-[1.2rem] font-medium tracking-[-0.03rem] text-[#9A9A9A] shadow-[inset_0_0_0_1px_#2F2F2F,0_0_16px_0_rgba(10,6,29,0.25)]',
              )}
            >
              레포지토리 추가
              <PlusIcon className={cn('text-[#9A9A9A]')} />
            </button>
          )}
        </div>
        <FieldErrorMessage message={repositoryErrorMessage} />
      </div>

      <div className={cn('flex flex-col gap-3')}>
        <label
          htmlFor="project-deploy-url"
          className={cn('text-base leading-[1.2rem] font-medium tracking-[-0.02rem] text-[#DDD]')}
        >
          프로젝트 배포 URL
        </label>

        <input
          id="project-deploy-url"
          type="text"
          inputMode="url"
          placeholder="프로젝트 배포 URL을 입력해주세요"
          {...register('prodUrl')}
          className={cn(
            'w-full rounded-xl bg-[rgba(34,34,34,0.5)] p-4 text-base leading-[1.2rem] font-medium tracking-[-0.03rem] text-white shadow-[inset_0_0_0_1px_#2F2F2F,0_0_16px_0_rgba(10,6,29,0.25)] outline-none',
            'placeholder:text-base placeholder:leading-[1.2rem] placeholder:font-medium placeholder:tracking-[-0.03rem] placeholder:text-[#9A9A9A]',
          )}
        />
        <FieldErrorMessage message={errors.prodUrl?.message} />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={cn(
          'mt-16 w-full rounded-xl bg-[#2C2C2C] px-4 py-6 text-2xl leading-[1.8rem] font-bold tracking-[-0.04rem] text-[#565656] shadow-[0_0_16px_0_rgba(10,6,29,0.25)] disabled:cursor-not-allowed',
          isValid && 'bg-[#FC335A] text-white',
        )}
      >
        {isSubmitting ? '프로젝트 등록 중' : '프로젝트 등록'}
      </button>
    </form>
  );
};

export default RegisterProjectForm;
