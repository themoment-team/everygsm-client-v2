import type { ChangeEventHandler, KeyboardEventHandler } from 'react';

import { ArrowIcon, XIcon } from '@/shared/assets';
import { cn } from '@/shared/utils';

import { DEFAULT_TECH_STACKS } from '../model/constants';
import FieldErrorMessage from './FieldErrorMessage';
import {
  fieldShellClassName,
  hintClassName,
  inputTextClassName,
  labelClassName,
  placeholderClassName,
} from './styles';

interface TechStackFieldProps {
  selectedTechStacks: string[];
  customTechStacks: string[];
  techStackInput: string;
  hasTechStackInput: boolean;
  errorMessage?: string;
  onToggleTechStack: (stack: string) => void;
  onRemoveCustomTechStack: (stack: string) => void;
  onTechStackInputChange: ChangeEventHandler<HTMLInputElement>;
  onTechStackInputKeyDown: KeyboardEventHandler<HTMLInputElement>;
  onAddCustomTechStack: () => void;
}

const TechStackField = ({
  selectedTechStacks,
  customTechStacks,
  techStackInput,
  hasTechStackInput,
  errorMessage,
  onToggleTechStack,
  onRemoveCustomTechStack,
  onTechStackInputChange,
  onTechStackInputKeyDown,
  onAddCustomTechStack,
}: TechStackFieldProps) => {
  return (
    <>
      <div className={cn('flex flex-col gap-3')}>
        <p className={cn(labelClassName)}>기술 스택</p>

        <div className={cn('flex w-full flex-wrap gap-x-3 gap-y-4 p-4', fieldShellClassName)}>
          {DEFAULT_TECH_STACKS.map((stack) => {
            const isSelected = selectedTechStacks.includes(stack);

            return (
              <button
                key={stack}
                type="button"
                onClick={() => onToggleTechStack(stack)}
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
              onClick={() => onRemoveCustomTechStack(stack)}
              className={cn(
                'flex items-center gap-2.5 rounded-full bg-[#FC335A] px-4 py-2 text-base leading-[1.2rem] font-medium tracking-[-0.03rem] text-white transition-colors',
              )}
            >
              {stack}
              <XIcon />
            </button>
          ))}
        </div>
        <FieldErrorMessage message={errorMessage} />
      </div>

      <div className={cn('flex flex-col gap-3')}>
        <div className={cn('flex items-center gap-3')}>
          <label htmlFor="project-tech-stack" className={cn(labelClassName)}>
            기술 스택 추가 입력
          </label>
          <p className={cn(hintClassName)}>최대 50개 추가 입력</p>
        </div>

        <div className={cn('flex w-full items-center p-4', fieldShellClassName)}>
          <input
            id="project-tech-stack"
            name="techStack"
            type="text"
            value={techStackInput}
            placeholder="위의 기술 스택 이외에 추가할 기술스택이 있다면 입력해주세요"
            onChange={onTechStackInputChange}
            onKeyDown={onTechStackInputKeyDown}
            className={cn('w-full', inputTextClassName, placeholderClassName)}
          />
          {hasTechStackInput && (
            <button
              type="button"
              onClick={onAddCustomTechStack}
              className={cn('flex cursor-pointer items-center justify-center')}
              aria-label="기술 스택 추가"
            >
              <ArrowIcon />
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default TechStackField;
