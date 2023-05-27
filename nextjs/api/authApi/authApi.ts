import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { parseCookies, setCookie, destroyCookie } from 'nookies';
import { HYDRATE } from 'next-redux-wrapper';

import { LoginFormDTO, LoginResponseDTO, RegistrstionFormDTO } from '../dto/auth.dto';
import { setUser, setAuth, reset } from '../../redux/user/userSlice';
import { BaseQuery } from '../BaseQuery';

const setUserData = (res: LoginResponseDTO, dispatch) => {
  const user = res.user;
  const token = res.refreshToken;

  setCookie(null, 'refreshToken', token, {
    path: '/',
  });

  dispatch(setUser(user));
  dispatch(setAuth(true));
};

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery(new BaseQuery()),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
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

          setUserData(data, dispatch);
        } catch (e) {
          console.log(e);
        }
      },
    }),
    registration: build.mutation<LoginResponseDTO, Partial<RegistrstionFormDTO>>({
      query: (body) => ({
        url: `registration`,
        method: 'POST',
        body,
      }),

      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          setUserData(data, dispatch);
        } catch (e) {
          console.log(e);
        }
      },
    }),
    checkAuth: build.query<LoginResponseDTO, string>({
      query: () => 'refresh',
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;

        setUserData(data, dispatch);
      },
    }),
    logout: build.query<LoginResponseDTO, string>({
      query: () => 'logout',
      async onQueryStarted(_, { dispatch }) {
        try {
          destroyCookie(null, 'refreshToken', {
            path: '/',
          });

          dispatch(reset());
        } catch (e) {
          console.log(e);
        }
      },
    }),
  }),
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,
  refetchOnFocus: true,
});

export const { useLoginMutation, useRegistrationMutation, useCheckAuthQuery } = authApi;
