import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BaseQuery } from '../BaseQuery';
import { SendPostMutation } from './sendPostMutation';

export const postApi = createApi({
  reducerPath: 'postApi',
  tagTypes: ['Posts'],
  baseQuery: fetchBaseQuery(new BaseQuery()),

  endpoints: (build) => ({
    setPost: build.mutation(new SendPostMutation()),
    // getById: build.query(new GetUserByIdQuery())
  }),
});

export const { useSetPostMutation } = postApi;
