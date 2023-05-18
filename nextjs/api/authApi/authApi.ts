import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { parseCookies, setCookie } from 'nookies';

import { LoginFormDTO, LoginResponseDTO } from '../dto/auth.dto';
import { setUser, setAuth } from '../../redux/slices/userSlice';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,

    prepareHeaders(headers) {
      const token = parseCookies();

      if (token) {
        headers.set('authorization', `Bearer ${token._token}`);
      }

      return headers;
    },
  }),
  endpoints: (build) => ({
    login: build.mutation<LoginResponseDTO, Partial<LoginFormDTO>>({
      query: (body) => ({
        url: `login`,
        method: 'POST',
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const user = data.user;
          const token = data.refreshToken;

          setCookie(null, '_token', token, {
            path: '/',
          });
          dispatch(setUser(user));
          dispatch(setAuth(true));
        } catch (e) {
          console.log(e);
        }
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
