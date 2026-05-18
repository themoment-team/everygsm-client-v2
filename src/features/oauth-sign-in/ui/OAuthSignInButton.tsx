'use client';

import { useState } from 'react';

import { toast } from 'sonner';

import { OAUTH_SESSION_KEYS } from '@/shared/constants';
import {
  cn,
  createAuthorizeUrl,
  generateCodeChallenge,
  generateCodeVerifier,
} from '@/shared/utils';

interface OAuthSignInButtonProps {
  className?: string;
}

const OAuthSignInButton = ({ className }: OAuthSignInButtonProps) => {
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setIsLoginLoading(true);

      const clientId = process.env.NEXT_PUBLIC_DATAGSM_OAUTH_CLIENT_ID;
      const redirectUri = `${window.location.origin}/callback`;

      if (!clientId) {
        throw new Error('OAuth 환경 변수가 설정되지 않았습니다.');
      }

      const state = crypto.randomUUID();
      const codeVerifier = generateCodeVerifier();
      const codeChallenge = await generateCodeChallenge(codeVerifier);

      sessionStorage.setItem(OAUTH_SESSION_KEYS.STATE, state);
      sessionStorage.setItem(OAUTH_SESSION_KEYS.CODE_VERIFIER, codeVerifier);

      const authorizeUrl = createAuthorizeUrl({
        clientId,
        redirectUri,
        state,
        codeChallenge,
      });

      window.location.href = authorizeUrl;
    } catch {
      setIsLoginLoading(false);
      toast.error('로그인에 실패했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  return (
    <button className={cn(className)} onClick={() => void handleLogin()} disabled={isLoginLoading}>
      로그인
    </button>
  );
};

export default OAuthSignInButton;
