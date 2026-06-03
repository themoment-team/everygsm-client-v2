import type { ChangeEventHandler, MouseEventHandler } from 'react';

import { UploadIcon, XIcon } from '@/shared/assets';
import { cn } from '@/shared/utils';

import FieldErrorMessage from './FieldErrorMessage';
import {
  fieldShellClassName,
  inputTextClassName,
  labelClassName,
  mutedTextClassName,
} from './styles';

interface LogoUploadFieldProps {
  logoInputKey: number;
  logoFileName: string;
  isImageUploading: boolean;
  hasUploadedLogo: boolean;
  errorMessage?: string;
  onLogoChange: ChangeEventHandler<HTMLInputElement>;
  onLogoRemove: MouseEventHandler<HTMLButtonElement>;
}

const LogoUploadField = ({
  logoInputKey,
  logoFileName,
  isImageUploading,
  hasUploadedLogo,
  errorMessage,
  onLogoChange,
  onLogoRemove,
}: LogoUploadFieldProps) => {
  return (
    <div className={cn('flex flex-col gap-3')}>
      <label htmlFor="project-logo" className={cn(labelClassName)}>
        프로젝트 로고
      </label>

      <label
        htmlFor="project-logo"
        className={cn(
          'flex h-34.5 w-full cursor-pointer flex-col items-center justify-center gap-3 px-4 py-6',
          fieldShellClassName,
        )}
      >
        <input
          key={logoInputKey}
          id="project-logo"
          name="logoFile"
          type="file"
          accept="image/*"
          onChange={onLogoChange}
          className={cn('sr-only')}
        />

        {hasUploadedLogo ? (
          <span
            className={cn(
              'flex items-center gap-2.5 p-4 shadow-[inset_0_0_0_1px_#2F2F2F,0_0_32px_0_rgba(10,6,29,0.35)]',
              fieldShellClassName,
              inputTextClassName,
            )}
          >
            {logoFileName}
            <button
              type="button"
              onClick={onLogoRemove}
              className={cn('cursor-pointer')}
              aria-label="프로젝트 로고 삭제"
            >
              <XIcon />
            </button>
          </span>
        ) : (
          <>
            <p className={cn(mutedTextClassName)}>
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
      <FieldErrorMessage message={errorMessage} />
    </div>
  );
};

export default LogoUploadField;
