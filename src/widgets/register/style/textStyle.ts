import { cn } from '@/shared/utils';

const textStyle = cn('text-white text-base font-medium leading-[1.2] tracking-[-0.02rem]');
const inputTextStyle = cn('text-[#9A9A9A] text-base font-medium leading-[1.2] tracking-[-0.03rem]');
const errorTextStyle = cn('text-[#FF7C7C] text-base font-medium leading-[1.2] tracking-[-0.02rem]');
const annotationStyle = cn(
  'text-[#6A6A6A] text-base font-medium leading-[1.2] tracking-[-0.02rem]',
);

export { annotationStyle, errorTextStyle, inputTextStyle, textStyle };
