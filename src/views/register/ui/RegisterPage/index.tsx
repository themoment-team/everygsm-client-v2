'use client';

import { useRef, useState } from 'react';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { usePostProjectRegistration } from '@/entities/project/model/usePostProjectRegistration';
import { UploadIcon, XIcon } from '@/shared/assets';
import { cn } from '@/shared/utils';
import {
  annotationStyle,
  errorTextStyle,
  InputForm,
  inputTextStyle,
  RegisterFormSchema,
  RegisterFormType,
  textStyle,
} from '@/widgets';

import { usePostProjectLogo } from '../../model';

const DEFAULT_TECH_STACK = [
  'HTML5 / CSS3',
  'React',
  'Spring Boot',
  'Python',
  'JavaScript',
  'MySQL',
  'Next.js',
  'MongoDB',
  'Tailwind CSS',
  'Node.js',
  'AWS',
  'Docker',
  'TypeScript',
  'Nginx',
];

const RegisterPage = () => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [customTech, setCustomTech] = useState('');

  const MAX_FILE_SIZE = 5 * 1024 * 1024;

  const { mutate: postProject, isPending } = usePostProjectRegistration({
    onSuccess: () => {
      router.push('/');
      toast.success('프로젝트 등록에 성공했습니다.');
    },
    onError: (error) => {
      console.error('프로젝트 등록 실패:', error);
      toast.error('프로젝트 등록에 실패했습니다.');
    },
  });

  const { mutateAsync: postImage } = usePostProjectLogo();

  const {
    register,
    setValue,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<RegisterFormType>({
    resolver: zodResolver(RegisterFormSchema),
    mode: 'onChange',
    defaultValues: {
      logo: '',
      title: '',
      affiliation: '',
      description: '',
      techStack: [],
      repository: [{ repoUrl: '' }],
      prodUrl: '',
    },
  });

  const {
    fields: techFields,
    append: appendTech,
    remove: removeTech,
  } = useFieldArray({
    control,
    name: 'techStack',
  });

  const {
    fields: repoFields,
    append: appendRepo,
    remove: removeRepo,
  } = useFieldArray({
    control,
    name: 'repository',
  });

  // 2. 핸들러 함수 및 기타 로직
  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const selectedFile = files[0];
    if (selectedFile.size >= MAX_FILE_SIZE) {
      toast.error('파일 크기가 5MB가 넘었어요.');
      return;
    }
    setFile(selectedFile);
    setValue('logo', selectedFile.name, { shouldValidate: true });
  };

  const handlePhotoUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await postImage(formData);
      return response.data.key;
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      toast.error('이미지 업로드에 실패했습니다.');
      throw error;
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const onSubmit = async (data: RegisterFormType) => {
    if (!file) {
      toast.error('프로젝트 로고를 등록해주세요.');
      return;
    }

    try {
      const logoKey = await handlePhotoUpload(file);

      console.log(logoKey);

      const updatedData = {
        ...data,
        logo: logoKey,
      };

      postProject(updatedData);
    } catch {
      console.log('error');
    }
  };

  const formatFileName = (name: string, maxLength = 36) => {
    if (name.length <= maxLength) return name;
    const lastDotIndex = name.lastIndexOf('.');
    if (lastDotIndex === -1) return `${name.slice(0, 36)}...`;
    const extension = name.slice(lastDotIndex);
    const front = name.slice(0, 36);
    return `${front} ... ${extension}`;
  };

  const toggleTech = (stackName: string) => {
    const index = techFields.findIndex((f) => f.stackName === stackName);
    if (index !== -1) {
      removeTech(index);
    } else {
      appendTech({ stackName });
    }
  };

  const handleAddCustomTech = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && customTech.trim()) {
      e.preventDefault();
      if (!techFields.some((f) => f.stackName === customTech.trim())) {
        appendTech({ stackName: customTech.trim() });
      }
      setCustomTech('');
    }
  };

  return (
    <div className={cn('flex min-h-full w-full justify-center bg-[#191919] py-10')}>
      <div className={cn('flex w-200 flex-col gap-[2.19rem]')}>
        <div>
          <h1
            className={cn('text-[2.25rem] leading-[1.2] font-bold tracking-[-0.045rem] text-white')}
          >
            프로젝트 등록
          </h1>
        </div>
        <form className={cn('flex flex-col gap-9')} onSubmit={handleSubmit(onSubmit)}>
          {/* 프로젝트 로고 */}
          <div className={cn('flex flex-col gap-3')}>
            <p className={textStyle}>프로젝트 로고</p>
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => {
                if (!file) inputRef.current?.click();
              }}
              className={cn(
                'flex h-34.5 cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border border-[#2F2F2F] bg-[rgba(34,34,34,0.5)] px-4 py-6',
              )}
            >
              {file ? (
                <div
                  className={cn(
                    'flex w-fit items-center gap-4 rounded-xl border border-solid border-[#2F2F2F] p-4',
                  )}
                >
                  <strong className={textStyle}>{formatFileName(file.name)}</strong>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setFile(null);
                      setValue('logo', '', { shouldValidate: true });
                    }}
                    className="cursor-pointer"
                  >
                    <XIcon />
                  </div>
                </div>
              ) : (
                <>
                  <p className={inputTextStyle}>
                    파일을 여기에 끌어서 놓거나 , 직접 파일을 선택해주세요
                  </p>
                  <div
                    className={cn('flex w-40 items-center gap-6 rounded-xl bg-[#191919] px-4 py-3')}
                  >
                    <UploadIcon />
                    <p className={inputTextStyle}>직접 파일 선택</p>
                  </div>
                </>
              )}
              <input
                ref={inputRef}
                type="file"
                hidden
                onChange={(e) => handleFiles(e.target.files)}
              />
            </div>
            {errors.logo?.message && <p className={errorTextStyle}>{errors.logo.message}</p>}
          </div>

          <InputForm
            inputTitle="프로젝트 제목"
            inputPlaceholder="프로젝트 제목을 입력해주세요"
            error={errors.title?.message}
            register={register('title')}
          />
          <InputForm
            inputTitle="소속 동아리 또는 팀명"
            inputPlaceholder="프로젝트를 진행한 동아리 또는 팀명을 입력해주세요"
            error={errors.affiliation?.message}
            register={register('affiliation')}
          />
          <InputForm
            inputTitle="프로젝트 설명"
            inputPlaceholder="200자 이내의 프로젝트 설명글을 입력해주세요"
            error={errors.description?.message}
            register={register('description')}
            type="textArea"
          />

          {/* 기술 스택 선택 */}
          <div className={cn('flex flex-col gap-3')}>
            <div className={cn('flex items-center justify-start gap-3')}>
              <div className={textStyle}>기술 스택</div>
              <div className={annotationStyle}>최대 50개 추가 입력</div>
            </div>
            <div
              className={cn(
                'flex min-h-27.5 flex-col gap-2 rounded-xl border border-solid border-[#2F2F2F] bg-[#222222] p-4',
              )}
            >
              <div className={cn('flex flex-wrap content-start gap-2')}>
                <div className="flex flex-wrap content-start gap-2">
                  {DEFAULT_TECH_STACK.map((item) => {
                    const isSelected = techFields.some((f) => f.stackName === item);
                    return (
                      <div
                        key={item}
                        onClick={() => toggleTech(item)}
                        className={cn(
                          'flex cursor-pointer items-center justify-center rounded-[62.5rem] px-3 py-[0.38rem] font-normal transition-colors',
                          isSelected ? 'bg-[#FC335A]' : 'bg-[#4F4F4F]',
                        )}
                      >
                        <span className={cn('cursor-pointer', textStyle)}>{item}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="flex flex-wrap content-start gap-2">
                  {techFields.map((field, index) => {
                    if (DEFAULT_TECH_STACK.includes(field.stackName)) return null;
                    return (
                      <div
                        key={field.id}
                        className={cn(
                          'flex max-w-fit items-center gap-[0.65rem] rounded-[62.5rem] bg-[#FC335A] px-3 py-[0.38rem]',
                        )}
                      >
                        <span className={textStyle}>{field.stackName}</span>
                        <div onClick={() => removeTech(index)} className="cursor-pointer">
                          <XIcon />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            {errors.techStack?.message && (
              <div className={errorTextStyle}>{errors.techStack?.message}</div>
            )}
          </div>

          {/* 기술 스택 추가 입력 */}
          <div className={cn('flex flex-col gap-3')}>
            <div className={cn('flex items-center justify-start gap-3')}>
              <div className={textStyle}>기술 스택 추가 입력</div>
              <div className={annotationStyle}>최대 50개 추가 입력</div>
            </div>
            <input
              type="text"
              placeholder="직접 입력 후 Enter를 눌러주세요"
              value={customTech}
              onChange={(e) => setCustomTech(e.target.value)}
              onKeyDown={handleAddCustomTech}
              className={cn(
                'rounded-xl border border-solid border-[#2F2F2F] bg-[#222222] p-4 transition-colors outline-none focus:border-[#FC335A]',
                inputTextStyle,
              )}
            />
          </div>

          {/* 깃허브 레포지토리 */}
          <div className={cn('flex flex-col gap-3')}>
            <div className={cn('flex items-center justify-start gap-3')}>
              <div className={textStyle}>깃허브 레포지토리</div>
              <div className={annotationStyle}>최대 10개 입력</div>
            </div>
            <div className={cn('flex flex-col gap-3')}>
              {repoFields.map((field, index) => (
                <div className={cn('relative flex items-center')} key={field.id}>
                  <input
                    type="text"
                    placeholder="GitHub 레포지토리 URL을 입력해주세요"
                    {...register(`repository.${index}.repoUrl`)}
                    className={cn(
                      'w-full rounded-xl border border-solid border-[#2F2F2F] bg-[#222222] p-4 pr-12 transition-colors outline-none focus:border-[#FC335A]',
                      inputTextStyle,
                    )}
                  />
                  {repoFields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeRepo(index)}
                      className={cn('absolute right-4 cursor-pointer text-white')}
                    >
                      <XIcon />
                    </button>
                  )}
                </div>
              ))}
            </div>
            {repoFields.length < 10 && (
              <button
                type="button"
                onClick={() => appendRepo({ repoUrl: '' })}
                className={cn(
                  'w-full rounded-xl border border-solid border-[#2F2F2F] bg-[#222222] p-4 transition-colors hover:bg-[#2F2F2F]',
                  inputTextStyle,
                )}
              >
                레포지토리 추가
              </button>
            )}
            {errors.repository && (
              <div className={errorTextStyle}>깃허브 레포지토리의 URL을 입력해주세요</div>
            )}
          </div>

          <InputForm
            inputTitle="프로젝트 배포 URL"
            inputPlaceholder="프로젝트 배포 URL을 입력해주세요"
            error={errors.prodUrl?.message}
            register={register('prodUrl')}
          />

          <button
            type="submit"
            disabled={!isValid || isPending}
            className={cn(
              'mt-6 w-full rounded-xl py-4 text-lg font-bold transition-all',
              isValid && !isPending
                ? 'cursor-pointer bg-[#FC335A] text-white hover:opacity-90 active:scale-[0.98]'
                : 'cursor-not-allowed bg-[#272727] text-[#565656]',
            )}
          >
            {isPending ? '등록 중...' : '프로젝트 등록'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
