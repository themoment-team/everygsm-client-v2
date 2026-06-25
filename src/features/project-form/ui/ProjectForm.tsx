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

import { useGetUsersSearch, type UserSummaryType } from '@/entities/user';
import { useDebounce } from '@/shared/hooks';
import { useModalStore } from '@/shared/stores';
import { cn } from '@/shared/utils';

import { DEFAULT_TECH_STACKS, MAX_FILE_SIZE } from '../model/constants';
import { type ProjectRegistrationReqType, ProjectRegistrationSchema } from '../model/schema';
import { usePostImageUpload } from '../model/usePostImageUpload';
import { usePostProjectRegistration } from '../model/usePostProjectRegistration';
import ImageCropModal from './ImageCropModal';
import LogoUploadField from './LogoUploadField';
import ParticipantsField from './ParticipantsField';
import RepositoryUrlField from './RepositoryUrlField';
import TechStackField from './TechStackField';
import TextareaField from './TextareaField';
import TextField from './TextField';

const MAX_TECH_STACK_COUNT = 50;
const MAX_REPOSITORY_COUNT = 10;

const getStartYearDigits = (value: unknown) => String(value).replace(/\D/g, '').slice(0, 4);

const resizeTextarea = (textarea: HTMLTextAreaElement) => {
  textarea.style.height = 'auto';
  textarea.style.height = `${textarea.scrollHeight}px`;
};

interface ProjectFormProps {
  mode?: 'register' | 'edit';
  initialData?: {
    logo?: string;
    title?: string;
    affiliation?: string;
    startYear?: number;
    description?: string;
    prodUrl?: string;
    techStack?: { stackName: string }[];
    repository?: string[];
    participantIds?: number[];
  };
  initialParticipants?: UserSummaryType[];
  onValidSubmit?: (data: ProjectRegistrationReqType) => void;
}

const ProjectForm = ({
  mode = 'register',
  initialData,
  initialParticipants,
  onValidSubmit,
}: ProjectFormProps = {}) => {
  const router = useRouter();
  const descriptionTextareaRef = useRef<HTMLTextAreaElement>(null);

  const [customTechStacks, setCustomTechStacks] = useState<string[]>(() => {
    if (!initialData?.techStack) return [];
    return initialData.techStack
      .map((s) => s.stackName)
      .filter((name) => !(DEFAULT_TECH_STACKS as readonly string[]).includes(name));
  });
  const [techStackInput, setTechStackInput] = useState('');
  const [participantInput, setParticipantInput] = useState<string>('');
  const [selectedParticipants, setSelectedParticipants] = useState<UserSummaryType[]>(
    initialParticipants ?? [],
  );
  const [logoFileName, setLogoFileName] = useState(initialData?.logo ? '(기존 로고)' : '');
  const [logoInputKey, setLogoInputKey] = useState(0);
  const [hasSubmittedSuccessfully, setHasSubmittedSuccessfully] = useState(false);

  const currentYear = new Date().getFullYear();
  const { openModal, closeModal } = useModalStore();

  const debouncedParticipantInput = useDebounce(participantInput, 500);
  const { data: searchedUsersData, isFetching: isSearchingUsers } =
    useGetUsersSearch(debouncedParticipantInput);
  const searchedUsers = searchedUsersData?.data.users ?? [];

  const isDebouncing = participantInput !== debouncedParticipantInput;
  const isSearching = isDebouncing || isSearchingUsers;

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting: isFormSubmitting, isValid },
  } = useForm<ProjectRegistrationReqType>({
    resolver: zodResolver(ProjectRegistrationSchema),
    mode: 'onChange',
    defaultValues: {
      logo: initialData?.logo ?? '',
      title: initialData?.title ?? '',
      affiliation: initialData?.affiliation ?? '',
      description: initialData?.description ?? '',
      prodUrl: initialData?.prodUrl ?? '',
      startYear: initialData?.startYear ?? currentYear,
      participantIds: initialData?.participantIds ?? [],
      techStack: initialData?.techStack ?? [],
      repository: initialData?.repository ?? [],
    },
  });

  const { mutateAsync: uploadImage, isPending: isImageUploading } = usePostImageUpload();
  const { mutateAsync: postProjectRegistration } = usePostProjectRegistration();

  const selectedTechStackValues = useWatch({ control, name: 'techStack' }) ?? [];
  const repositoryUrls = useWatch({ control, name: 'repository' }) ?? [];
  const participantIds = useWatch({ control, name: 'participantIds' }) ?? [];
  const logo = useWatch({ control, name: 'logo' });

  const selectedTechStacks = selectedTechStackValues.map((stack) => stack.stackName);

  const isSubmitDisabled = isImageUploading || isFormSubmitting || hasSubmittedSuccessfully;
  const hasUploadedLogo = Boolean(logo && logoFileName);

  const startYearField = register('startYear', {
    setValueAs: (value) => {
      const digits = getStartYearDigits(value);
      return digits ? Number(digits) : NaN;
    },
  });

  const startYearRegistration = {
    ...startYearField,
    onChange: async (event: Parameters<typeof startYearField.onChange>[0]) => {
      event.target.value = getStartYearDigits(event.target.value);
      await startYearField.onChange(event);
    },
  };

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

  const addParticipant = (user: UserSummaryType) => {
    setSelectedParticipants((prev) => [...prev, user]);
    setValue('participantIds', [...participantIds, user.userId], {
      shouldDirty: true,
      shouldValidate: true,
    });
    setParticipantInput('');
  };

  const removeParticipant = (targetIndex: number) => {
    setSelectedParticipants((prev) => prev.filter((_, index) => index !== targetIndex));
    setValue(
      'participantIds',
      participantIds.filter((_, index) => index !== targetIndex),
      { shouldDirty: true, shouldValidate: true },
    );
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

  const handleLogoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    const selectedFile = files[0];

    const allowedExtensions = ['png', 'jpg', 'jpeg'];
    const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase();

    if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
      toast.error('png, jpg, jpeg 형식의 이미지만 업로드 가능해요.');
      return;
    }

    if (selectedFile.size >= MAX_FILE_SIZE) {
      toast.error('파일 크기가 5MB가 넘었어요.');
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    openModal(
      <ImageCropModal
        imageSrc={objectUrl}
        fileName={selectedFile.name}
        fileType={selectedFile.type}
        onCropComplete={handleCropComplete}
        onClose={closeModal}
      />,
      {
        onClose: () => URL.revokeObjectURL(objectUrl),
      },
    );
  };

  const handleCropComplete = async (croppedFile: File) => {
    setLogoFileName(croppedFile.name);

    try {
      const response = await uploadImage({ image: croppedFile });
      setValue('logo', response.data.key, { shouldDirty: true, shouldValidate: true });
    } catch {
      setLogoFileName('');
      setValue('logo', '', { shouldDirty: true, shouldValidate: true });
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

    if (onValidSubmit) {
      onValidSubmit(requestBody);
      return;
    }

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
        registration={startYearRegistration}
        errorMessage={errors.startYear?.message}
      />
      <ParticipantsField
        participants={selectedParticipants}
        participantInput={participantInput}
        searchedUsers={searchedUsers}
        isSearching={isSearching}
        errorMessage={errors.participantIds?.message}
        onAddParticipant={addParticipant}
        onRemoveParticipant={removeParticipant}
        onParticipantInputChange={(event) => setParticipantInput(event.target.value)}
      />
      <TextareaField
        id="project-description"
        label="프로젝트 설명"
        placeholder="200자 이내의  프로젝트 설명글을 입력해주세요"
        registration={register('description')}
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
        {isFormSubmitting
          ? `프로젝트 ${mode === 'edit' ? '수정' : '등록'} 중`
          : `프로젝트 ${mode === 'edit' ? '수정' : '등록'}`}
      </button>
    </form>
  );
};

export default ProjectForm;
