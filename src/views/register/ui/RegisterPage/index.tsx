'use client';

import { useRef, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';

import { cn } from '@/shared/utils';
import {
  ErrorTextStyle,
  InputForm,
  InputTextStyle,
  RegisterFormSchema,
  RegisterFormSchemaType,
  TextStyle,
  UploadIcon,
  XIcon,
  annotationStyle,
} from '@/widgets';

const RegisterPage = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [customTech, setCustomTech] = useState('');

  const defaultTechStack = [
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

  const {
    register,
    setValue,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<RegisterFormSchemaType>({
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

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setFile(files[0]);
    setValue('logo', files[0].name);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const onSubmit = (data: RegisterFormSchemaType) => {
    console.log('최종 데이터:', data);
  };

  const formatFileName = (name: string, maxLength = 36) => {
    if (name.length <= maxLength) return name;
    const lastDotIndex = name.lastIndexOf('.');
    if (lastDotIndex === -1) return `${name.slice(0, 36)}...`;
    const extension = name.slice(lastDotIndex);
    const front = name.slice(0, 36);
    return `${front} ... ${extension}`;
  };

  // 기술 스택 토글 함수
  const toggleTech = (stackName: string) => {
    const index = techFields.findIndex((f) => f.stackName === stackName);
    if (index !== -1) {
      removeTech(index);
    } else {
      appendTech({ stackName });
    }
  };

  // 직접 입력 기술 스택 추가
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
    <div className={cn('flex min-h-full w-full justify-center bg-[#191919] pt-10')}>
      <div className={cn('h-370.7 flex w-200 flex-col gap-[2.19rem]')}>
        <div>
          <h1
            className={cn('text-[2.25rem] leading-[1.2] font-bold tracking-[-0.045rem] text-white')}
          >
            프로젝트 등록
          </h1>
        </div>
        <form className={cn('flex flex-col gap-9')} onSubmit={handleSubmit(onSubmit)}>
          <div className={cn('flex flex-col gap-3')}>
            <p className={TextStyle}>프로젝트 로고</p>
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
                  <strong className={TextStyle}>{formatFileName(file.name)}</strong>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setFile(null);
                      setValue('logo', '');
                    }}
                  >
                    <XIcon />
                  </div>
                </div>
              ) : (
                <>
                  <p className={InputTextStyle}>
                    파일을 여기에 끌어서 놓거나 , 직접 파일을 선택해주세요
                  </p>
                  <div
                    className={cn('flex w-40 items-center gap-6 rounded-xl bg-[#191919] px-4 py-3')}
                  >
                    <UploadIcon />
                    <p className={InputTextStyle}>직접 파일 선택</p>
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
            {errors.logo?.message && <p className={ErrorTextStyle}>{errors.logo.message}</p>}
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

          <div className={cn('flex flex-col gap-3')}>
            <div className={cn('align-center flex justify-start gap-3')}>
              <div className={TextStyle}>기술 스택</div>
              <div className={annotationStyle}>최대 50개 추가 입력</div>
            </div>
            <div
              className={cn(
                'flex min-h-27.5 flex-col gap-2 rounded-xl border border-solid border-[#2F2F2F] bg-[#222222] p-4',
              )}
            >
              <div className={cn('flex flex-wrap content-start gap-2')}>
                {/* 기본 기술 스택 칩 */}
                {defaultTechStack.map((item) => {
                  const isSelected = techFields.some((f) => f.stackName === item);
                  return (
                    <div
                      key={item}
                      onClick={() => toggleTech(item)}
                      className={cn(
                        `flex cursor-pointer items-center justify-center rounded-[62.5rem] px-3 py-[0.38rem] font-normal ${
                          isSelected ? 'bg-[#FC335A]' : 'bg-[#4F4F4F]'
                        }`,
                      )}
                    >
                      <label className={cn(`cursor-pointer ${TextStyle}`)}>{item}</label>
                    </div>
                  );
                })}
                {/* 직접 추가한 기술 스택 칩 (기본 목록에 없는 것들만 표시) */}
                {techFields.map((field, index) => {
                  if (defaultTechStack.includes(field.stackName)) return null;
                  return (
                    <div
                      key={field.id}
                      className={cn(
                        'flex max-w-fit items-center gap-[0.65rem] rounded-[62.5rem] bg-[#FC335A] px-3 py-[0.38rem]',
                      )}
                    >
                      <span className={TextStyle}>{field.stackName}</span>
                      <div onClick={() => removeTech(index)} className="cursor-pointer">
                        <XIcon />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {errors.techStack?.message && (
              <div className={ErrorTextStyle}>{errors.techStack?.message}</div>
            )}
          </div>

          <div className={cn('flex flex-col gap-3')}>
            <div className={cn('align-center flex justify-start gap-3')}>
              <div className={TextStyle}>기술 스택 추가 입력</div>
              <div className={annotationStyle}>최대 50개 추가 입력</div>
            </div>
            <input
              type="text"
              placeholder="직접 입력 후 Enter를 눌러주세요"
              value={customTech}
              onChange={(e) => setCustomTech(e.target.value)}
              onKeyDown={handleAddCustomTech}
              className={cn(
                `rounded-xl border border-solid border-[#2F2F2F] bg-[#222222] p-4 ${InputTextStyle}`,
              )}
            />
          </div>

          <div className={cn('flex flex-col gap-3')}>
            <div className={cn('align-center flex justify-start gap-3')}>
              <div className={TextStyle}>깃허브 레포지토리</div>
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
                      `w-full rounded-xl border border-solid border-[#2F2F2F] bg-[#222222] p-4 pr-12 ${InputTextStyle}`,
                    )}
                  />
                  {repoFields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeRepo(index)}
                      className={cn('absolute right-4 cursor-pointer')}
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
                  `${InputTextStyle} w-full rounded-xl border border-solid border-[#2F2F2F] bg-[#222222] p-4`,
                )}
              >
                레포지토리 추가
              </button>
            )}
            {errors.repository && (
              <div className={ErrorTextStyle}>깃허브 레포지토리의 URL을 입력해주세요</div>
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
            disabled={!isValid}
            className={cn(
              'mt-6 w-full rounded-xl py-4 text-lg font-bold transition-opacity hover:opacity-90',
              isValid
                ? 'cursor-pointer bg-[#FC335A] text-white'
                : 'cursor-not-allowed bg-[#272727] text-[#565656]',
            )}
          >
            프로젝트 등록
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
