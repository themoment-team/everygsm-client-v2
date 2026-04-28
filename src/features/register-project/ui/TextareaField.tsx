import type { InputEventHandler } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

import { cn } from '@/shared/utils';

import FieldErrorMessage from './FieldErrorMessage';
import {
  fieldShellClassName,
  inputTextClassName,
  labelClassName,
  placeholderClassName,
} from './styles';

interface TextareaFieldProps {
  id: string;
  label: string;
  placeholder: string;
  registration: UseFormRegisterReturn;
  errorMessage?: string;
  onInput: InputEventHandler<HTMLTextAreaElement>;
  onTextareaElementChange: (element: HTMLTextAreaElement | null) => void;
}

const TextareaField = ({
  id,
  label,
  placeholder,
  registration,
  errorMessage,
  onInput,
  onTextareaElementChange,
}: TextareaFieldProps) => {
  return (
    <div className={cn('flex flex-col gap-3')}>
      <label htmlFor={id} className={cn(labelClassName)}>
        {label}
      </label>

      <textarea
        id={id}
        placeholder={placeholder}
        onInput={onInput}
        {...registration}
        ref={(element) => {
          registration.ref(element);
          onTextareaElementChange(element);
        }}
        className={cn(
          'min-h-34.5 w-full resize-none overflow-hidden p-4',
          fieldShellClassName,
          inputTextClassName,
          placeholderClassName,
        )}
      />
      <FieldErrorMessage message={errorMessage} />
    </div>
  );
};

export default TextareaField;
