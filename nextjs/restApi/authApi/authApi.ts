import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCookie, destroyCookie } from 'nookies';

import { LoginFormDTO, LoginResponseDTO, RegistrstionFormDTO } from '../dto/auth.dto';
import { setUser, setAuth, reset } from '../../redux/user/userSlice';
import { BaseQuery } from '../BaseQuery';
import { socket } from '../../socket';

const setUserData = (res: LoginResponseDTO, dispatch) => {
  const user = res.user;
  const accessToken = res.accessToken;

  setCookie(null, 'accessToken', accessToken, {
    path: '/',
  });

  dispatch(setUser(user));
  dispatch(setAuth(true));
};

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery(new BaseQuery()),

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
          socket.connect();
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

          socket.connect();
        } catch (e) {
          console.log(e);
        }
      },
    }),
    checkAuth: build.query<LoginResponseDTO, string>({
      query: () => 'refresh',
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          setUserData(data, dispatch);

          socket.connect();
        } catch (e) {
          console.log(e);
        }
      },
    }),
    logout: build.mutation({
      query: () => ({
        url: `logout`,
        method: 'POST',
      }),
      async onQueryStarted(_, { dispatch }) {
        try {
          destroyCookie(null, 'accessToken', {
            path: '/',
          });

          dispatch(reset());
          socket.disconnect();
        } catch (e) {
          console.log(e);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useRegistrationMutation, useCheckAuthQuery, useLogoutMutation } =
  authApi;
