interface CreateAuthorizeUrlParams {
  clientId: string;
  redirectUri: string;
  state: string;
  codeChallenge: string;
}

const base64UrlEncode = (array: Uint8Array): string => {
  const base64 = btoa(String.fromCharCode(...array));

  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

export const generateCodeVerifier = (): string => {
  const randomBytes = new Uint8Array(32);
  crypto.getRandomValues(randomBytes);

  return base64UrlEncode(randomBytes);
};

export const generateCodeChallenge = async (codeVerifier: string): Promise<string> => {
  const encoded = new TextEncoder().encode(codeVerifier);
  const digest = await crypto.subtle.digest('SHA-256', encoded);

  return base64UrlEncode(new Uint8Array(digest));
};

export const createAuthorizeUrl = ({
  clientId,
  redirectUri,
  state,
  codeChallenge,
}: CreateAuthorizeUrlParams): string => {
  const authorizeBaseUrl = 'https://oauth.authorization.datagsm.kr/v1/oauth/authorize';

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    state,
    code_challenge: codeChallenge,
    code_challenge_method: 'S256',
  });

  return `${authorizeBaseUrl}?${params.toString()}`;
};
