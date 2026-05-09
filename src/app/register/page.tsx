import type { Metadata } from 'next';

import { RegisterPage } from '@/views/register';

export const metadata: Metadata = {
  title: '프로젝트 등록',
  description: 'EveryGSM에 새 프로젝트를 등록하세요.',
};

const Register = () => {
  return <RegisterPage />;
};

export default Register;
