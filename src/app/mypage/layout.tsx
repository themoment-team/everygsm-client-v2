import { ReactNode } from 'react';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

const MypageLayout = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export default MypageLayout;
