//@ts-nocheck
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BaseQuery } from '../BaseQuery';
import { GetUserQuery } from './getUserQuery';
import { PatchUserMutation } from './patchUserMutation';
import { GetUserListQuery } from './getUserListQuery';

export const userApi = createApi({
  reducerPath: 'userApi',
  tagTypes: ['User'],
  baseQuery: fetchBaseQuery(new BaseQuery()),

  endpoints: (build) => ({
    getUser: build.query(new GetUserQuery()),
    getUserList: build.query(new GetUserListQuery()),
    patchUser: build.mutation(new PatchUserMutation()),
  }),
});

export const { useGetUserQuery, usePatchUserMutation, useLazyGetUserListQuery } = userApi;
