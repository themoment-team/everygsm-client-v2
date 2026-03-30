import type { Metadata } from 'next';

import { getUserInfo } from '@/entities/auth/index.server';
import { TanStackProvider } from '@/shared/lib';
import { pretendard } from '@/shared/styles';
import { ModalContainer } from '@/shared/ui';
import { AppToaster } from '@/shared/ui';
import { Header } from '@/widgets/header';

import '@/shared/styles/globals.css';

export const metadata: Metadata = {
  title: 'EveryGSM',
  description: '광주소프트웨어마이스터고등학교의 모든 프로젝트를 한곳에',
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [initialUserInfoData] = await Promise.all([getUserInfo()]);

  return (
    <html lang="ko">
      <body className={pretendard.className}>
        <TanStackProvider>
          <Header initialUserInfoData={initialUserInfoData} />
          {children}
          <AppToaster />
          <ModalContainer />
        </TanStackProvider>
      </body>
    </html>
  );
};

export default RootLayout;
