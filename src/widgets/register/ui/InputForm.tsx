import { UseFormRegisterReturn } from 'react-hook-form';

import { cn } from '@/shared/utils';

import { annotationStyle, errorTextStyle, inputTextStyle, textStyle } from '../style/textStyle';

interface InputFormProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  inputTitle?: string;
  inputPlaceholder?: string;
  annotation?: string;
  error?: string | undefined;
  register?: UseFormRegisterReturn;
  type?: 'input' | 'textArea';
  rightElement?: React.ReactNode;
}

const InputForm = ({
  inputTitle,
  inputPlaceholder,
  annotation,
  error,
  register,
  type = 'input',
  className,
  rightElement,
  ...props
}: InputFormProps) => {
  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {(inputTitle || annotation) && (
        <div className={cn('flex items-center justify-start gap-3')}>
          {inputTitle && <div className={textStyle}>{inputTitle}</div>}
          {annotation && <div className={annotationStyle}>{annotation}</div>}
        </div>
      )}

      <div className="relative flex items-center">
        {type === 'input' && (
          <input
            type="text"
            placeholder={inputPlaceholder}
            {...register}
            {...props}
            onChange={(e) => {
              props.onChange?.(e as React.ChangeEvent<HTMLInputElement>);
              register?.onChange(e);
            }}
            className={cn(
              'w-full rounded-xl border border-solid border-[#2F2F2F] bg-[#222222] p-4 outline-none focus:border-white',
              rightElement && 'pr-12',
              inputTextStyle,
            )}
          />
        )}

        {type === 'textArea' && (
          <textarea
            placeholder={inputPlaceholder}
            {...register}
            {...props}
            onChange={(e) => {
              props.onChange?.(e as React.ChangeEvent<HTMLTextAreaElement>);
              register?.onChange(e);
            }}
            onInput={(e) => {
              const el = e.currentTarget;
              const scrollY = window.scrollY;

              el.style.height = 'auto';
              el.style.height = `${el.scrollHeight}px`;

              window.scrollTo({
                top: scrollY,
              });
            }}
            className={cn(
              'min-h-34.5 w-full resize-none overflow-hidden rounded-xl border border-solid border-[#2F2F2F] bg-[#222222] p-4 outline-none focus:border-white',
              inputTextStyle,
            )}
          />
        )}

        {rightElement && (
          <div className={cn('absolute right-4 flex items-center')}>{rightElement}</div>
        )}
      </div>

      {error && <div className={errorTextStyle}>{error}</div>}
    </div>
  );
};

export default InputForm;
