import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BaseQuery } from '../BaseQuery';
import { GetUserQuery } from './getUserQuery';
import { PatchUserMutation } from './patchUserMutation';

export const userApi = createApi({
  reducerPath: 'userApi',
  tagTypes: ['User'],
  baseQuery: fetchBaseQuery(new BaseQuery()),

  endpoints: (build) => ({
    getUser: build.query(new GetUserQuery()),
    patchUser: build.mutation(new PatchUserMutation()),
  }),
});

export const { useGetUserQuery, usePatchUserMutation } = userApi;
