import { Suspense } from 'react';

import { SuspenseFallback } from '@/shared/ui';
import { RegisterPage } from '@/views/register';

const Register = () => {
  return (
    <Suspense fallback={<SuspenseFallback />}>
      <RegisterPage />
    </Suspense>
  );
};

export default Register;
