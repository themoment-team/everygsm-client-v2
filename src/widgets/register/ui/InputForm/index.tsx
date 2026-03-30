import { UseFormRegisterReturn } from 'react-hook-form';

import { cn } from '@/shared/utils';

import { annotationStyle, errorTextStyle, inputTextStyle, textStyle } from '../../style';

interface InputFormProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  inputTitle: string;
  inputPlaceholder?: string;
  annotation?: string;
  error?: string | undefined;
  register?: UseFormRegisterReturn;
  type?: 'input' | 'textArea';
}

const InputForm = ({
  inputTitle,
  inputPlaceholder,
  annotation,
  error,
  register,
  type = 'input',
  className,
  ...props
}: InputFormProps) => {
  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <div className={cn('align-center flex justify-start gap-3')}>
        <div className={textStyle}>{inputTitle}</div>
        {annotation && <div className={annotationStyle}>{annotation}</div>}
      </div>

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
            'rounded-xl border border-solid border-[#2F2F2F] bg-[#222222] p-4 transition-colors outline-none focus:border-white',
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
            'min-h-34.5 resize-none overflow-hidden rounded-xl border border-solid border-[#2F2F2F] bg-[#222222] p-4 transition-colors outline-none focus:border-white',
            inputTextStyle,
          )}
        />
      )}

      {error && <div className={errorTextStyle}>{error}</div>}
    </div>
  );
};

export default InputForm;
