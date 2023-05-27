import { parseCookies } from 'nookies';
type prepareHeaders = (
  headers: Headers,
  api: {
    getState: () => unknown;
    extra: unknown;
    endpoint: string;
    type: 'query' | 'mutation';
    forced: boolean | undefined;
  },
) => Headers | void;

export class BaseQuery {
  baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  credentials: 'include';
  prepareHeaders: prepareHeaders = (headers) => {
    const { refreshToken } = parseCookies();

    if (refreshToken) {
      headers.set('authorization', `Bearer ${refreshToken}`);
    }

    return headers;
  };
}
