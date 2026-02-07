import { cn } from '@/shared/utils';

const TextStyle = cn('text-white text-base font-medium leading-[1.2] tracking-[-0.02rem]');
const InputTextStyle = cn('text-[#9A9A9A] text-base font-medium leading-[1.2] tracking-[-0.03rem]');
const ErrorTextStyle = cn('text-[#FF7C7C] text-base font-medium leading-[1.2] tracking-[-0.02rem]');
const annotationStyle = cn(
  'text-[#6A6A6A] text-base font-medium leading-[1.2] tracking-[-0.02rem]',
);

export { TextStyle, InputTextStyle, ErrorTextStyle, annotationStyle };
