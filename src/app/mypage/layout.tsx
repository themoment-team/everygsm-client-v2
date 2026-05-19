import { ReactNode } from 'react';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '마이페이지',
  robots: { index: false, follow: false },
};

const MypageLayout = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export default MypageLayout;
