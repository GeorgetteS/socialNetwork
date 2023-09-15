import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BaseQuery } from '../BaseQuery';
import { SendPostMutation } from './sendPostMutation';
import { GetPostsByUserIdQuery } from './getPostsByUserIdQuery';

export const postApi = createApi({
  reducerPath: 'postApi',
  tagTypes: ['Posts'],
  baseQuery: fetchBaseQuery(new BaseQuery()),

  endpoints: (build) => ({
    getPostsByUserId: build.query(new GetPostsByUserIdQuery()),
    // @ts-ignore all nice
    setPost: build.mutation(new SendPostMutation()),
    //  deletePost: build.query(new GetPostsByUserIdQuery()),
  }),
});

export const { useSetPostMutation, useGetPostsByUserIdQuery } = postApi;
