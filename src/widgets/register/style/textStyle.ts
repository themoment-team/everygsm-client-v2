import { cn } from '@/shared/utils';

const baseTextStyle = 'text-base font-medium leading-[1.2]';

const textStyle = cn(baseTextStyle, 'text-white tracking-[-0.02rem]');
const inputTextStyle = cn(baseTextStyle, 'text-[#9A9A9A] tracking-[-0.03rem]');
const errorTextStyle = cn(baseTextStyle, 'text-[#FF7C7C] tracking-[-0.02rem]');
const annotationStyle = cn(baseTextStyle, 'text-[#6A6A6A] tracking-[-0.02rem]');

export { annotationStyle, errorTextStyle, inputTextStyle, textStyle };
