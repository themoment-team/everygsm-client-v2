import { PlusIcon, XIcon } from '@/shared/assets';
import { cn } from '@/shared/utils';

import FieldErrorMessage from './FieldErrorMessage';
import {
  fieldShellClassName,
  hintClassName,
  inputTextClassName,
  labelClassName,
  placeholderClassName,
} from './styles';

interface RepositoryUrlFieldProps {
  repositoryUrls: string[];
  canAddRepository: boolean;
  errorMessage?: string;
  onAddRepositoryInput: () => void;
  onUpdateRepositoryUrl: (targetIndex: number, value: string) => void;
  onRemoveRepositoryInput: (targetIndex: number) => void;
}

const RepositoryUrlField = ({
  repositoryUrls,
  canAddRepository,
  errorMessage,
  onAddRepositoryInput,
  onUpdateRepositoryUrl,
  onRemoveRepositoryInput,
}: RepositoryUrlFieldProps) => {
  return (
    <div className={cn('flex flex-col gap-3')}>
      <div className={cn('flex items-center gap-3')}>
        <p className={cn(labelClassName)}>깃허브 레포지토리</p>
        <p className={cn(hintClassName)}>최대 10개 입력</p>
      </div>

      <div className={cn('flex flex-col gap-3')}>
        {repositoryUrls.map((repositoryUrl, index) => (
          <div
            key={index}
            className={cn('flex w-full items-center overflow-hidden', fieldShellClassName)}
          >
            <input
              name="repositoryUrls"
              type="text"
              inputMode="url"
              value={repositoryUrl}
              placeholder="깃허브 레포지토리 URL을 입력해주세요"
              onChange={(event) => onUpdateRepositoryUrl(index, event.target.value)}
              className={cn('w-full p-4', inputTextClassName, placeholderClassName)}
            />
            <button
              type="button"
              onClick={() => onRemoveRepositoryInput(index)}
              className={cn('flex cursor-pointer items-center justify-center p-4')}
              aria-label="깃허브 레포지토리 삭제"
            >
              <XIcon />
            </button>
          </div>
        ))}

        {canAddRepository && (
          <button
            type="button"
            onClick={onAddRepositoryInput}
            className={cn(
              'flex w-full cursor-pointer items-center justify-center gap-3 p-4',
              fieldShellClassName,
              inputTextClassName,
              'text-[#9A9A9A]',
            )}
          >
            레포지토리 추가
            <PlusIcon className={cn('text-[#9A9A9A]')} />
          </button>
        )}
      </div>
      <FieldErrorMessage message={errorMessage} />
    </div>
  );
};

export default RepositoryUrlField;
