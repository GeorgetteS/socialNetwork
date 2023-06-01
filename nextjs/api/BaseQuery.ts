import { parseCookies } from 'nookies';

export class BaseQuery {
  baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  credentials = 'include';
  prepareHeaders = (headers) => {
    const { accessToken } = parseCookies();

    if (accessToken) {
      headers.set('authorization', `Bearer ${accessToken}`);
    }

    return headers;
  };
}
