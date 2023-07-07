import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BaseQuery } from '../BaseQuery';
import { GetFriendsQuery } from './getFriendsQuery';

export const friendApi = createApi({
  reducerPath: 'friendApi',
  tagTypes: ['friend'],
  baseQuery: fetchBaseQuery(new BaseQuery()),

  endpoints: (build) => ({
    getFriends: build.query(new GetFriendsQuery()),
  }),
});

export const { useGetFriendsQuery } = friendApi;
