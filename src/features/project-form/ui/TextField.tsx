import type { HTMLInputTypeAttribute } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

import { cn } from '@/shared/utils';

import FieldErrorMessage from './FieldErrorMessage';
import {
  fieldShellClassName,
  inputTextClassName,
  labelClassName,
  placeholderClassName,
} from './styles';

interface TextFieldProps {
  id: string;
  label: string;
  placeholder: string;
  registration: UseFormRegisterReturn;
  errorMessage?: string;
  type?: HTMLInputTypeAttribute;
  inputMode?: 'url';
}

const TextField = ({
  id,
  label,
  placeholder,
  registration,
  errorMessage,
  type = 'text',
  inputMode,
}: TextFieldProps) => {
  return (
    <div className={cn('flex flex-col gap-3')}>
      <label htmlFor={id} className={cn(labelClassName)}>
        {label}
      </label>

      <input
        id={id}
        type={type}
        inputMode={inputMode}
        placeholder={placeholder}
        {...registration}
        className={cn('w-full p-4', fieldShellClassName, inputTextClassName, placeholderClassName)}
      />
      <FieldErrorMessage message={errorMessage} />
    </div>
  );
};

export default TextField;
