import type { Metadata } from 'next';

import { getMyInfo } from '@/entities/user/index.server';
import { TanStackProvider } from '@/shared/lib';
import { pretendard } from '@/shared/styles';
import { ModalContainer } from '@/shared/ui';
import { AppToaster } from '@/shared/ui';
import { Header } from '@/widgets/header';

import '@/shared/styles/globals.css';

const BASE_URL = 'https://every.datagsm.kr';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    template: '%s | EveryGSM',
    default: 'EveryGSM',
  },
  description: '광주소프트웨어마이스터고등학교의 모든 프로젝트를 한곳에',
  applicationName: 'EveryGSM',
  keywords: [
    'EveryGSM',
    'every-gsm',
    'Every-GSM',
    'every',
    '광주소프트웨어마이스터고등학교',
    '광주소프트웨어마이스터고',
    '광소마',
    'GSM',
    '학생 프로젝트',
    'GwangjuSoftwareMeisterHighSchool',
  ],
  creator: 'the-moment',
  publisher: 'the-moment',

  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },

  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: BASE_URL,
    siteName: 'EveryGSM',
    title: 'EveryGSM',
    description: '광주소프트웨어마이스터고등학교의 모든 프로젝트를 한곳에',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1920,
        height: 1080,
        alt: 'EveryGSM',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'EveryGSM',
    description: '광주소프트웨어마이스터고등학교의 모든 프로젝트를 한곳에',
    images: ['/opengraph-image.png'],
  },
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [initialUserInfoData] = await Promise.all([getMyInfo()]);

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
