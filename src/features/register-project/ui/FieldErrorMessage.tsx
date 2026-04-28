import { cn } from '@/shared/utils';

import { errorTextClassName } from './styles';

interface FieldErrorMessageProps {
  message?: string;
}

const FieldErrorMessage = ({ message }: FieldErrorMessageProps) => {
  if (!message) return null;

  return <p className={cn(errorTextClassName)}>{message}</p>;
};

export default FieldErrorMessage;
