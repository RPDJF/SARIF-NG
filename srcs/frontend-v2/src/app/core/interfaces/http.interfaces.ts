import { User } from '../state/user/user.state.types';

export interface NormalizedSarifHttpResponse {
  detail: string;
  status: number;
  module: string;
  type: string;
  title: string;
  instance: string;
}

export interface NormalizedSarifJwtToken {
  token: string;
  sub: string;
  data: Partial<User>;
  iss: string;
  iat: number;
  exp: number;
}

type apiStatus = 'loading' | 'success' | 'error' | undefined;

export interface ServiceApiStatus {
  normalizedSarifHttpResponse?: Partial<NormalizedSarifHttpResponse>;
  status: apiStatus;
}
