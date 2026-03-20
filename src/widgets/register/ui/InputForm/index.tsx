import { UseFormRegisterReturn } from 'react-hook-form';

import { cn } from '@/shared/utils';

import { ErrorTextStyle, InputTextStyle, TextStyle, annotationStyle } from '../../style';

type InputFormProps = {
  inputTitle: string;
  inputPlaceholder?: string;
  annotation?: string;
  error?: string | undefined;
  register?: UseFormRegisterReturn;
  checkList?: string[];
  state?: string;
  setState?: React.Dispatch<React.SetStateAction<string>>;
  type?: 'input' | 'textArea';
};

const InputForm = ({
  inputTitle,
  inputPlaceholder,
  annotation,
  error,
  register,
  state,
  setState,
  type = 'input',
}: InputFormProps) => {
  return (
    <div className={cn('flex flex-col gap-3')}>
      <div className={cn('align-center flex justify-start gap-3')}>
        <div className={TextStyle}>{inputTitle}</div>
        {annotation && <div className={annotationStyle}>{annotation}</div>}
      </div>

      {type === 'input' && (
        <input
          type="text"
          placeholder={inputPlaceholder}
          {...register}
          {...(state !== undefined && { value: state })}
          onChange={(e) => {
            setState?.(e.target.value);
            register?.onChange(e);
          }}
          className={cn(
            `rounded-xl border border-solid border-[#2F2F2F] bg-[#222222] p-4 ${InputTextStyle}`,
          )}
        />
      )}

      {type === 'textArea' && (
        <textarea
          placeholder={inputPlaceholder}
          {...register}
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
            `rounded-xl border border-solid border-[#2F2F2F] bg-[#222222] p-4 ${InputTextStyle} min-h-34.5 resize-none overflow-hidden`,
          )}
        />
      )}

      {error && <div className={ErrorTextStyle}>{error}</div>}
    </div>
  );
};

export default InputForm;
