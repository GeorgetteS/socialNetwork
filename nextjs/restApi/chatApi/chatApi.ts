import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BaseQuery } from '../BaseQuery';
import { GetChatsByUserIdQuery } from './getChatsByUserId';
import { GetMessagesByChatIdQuery } from './getMessagesByChatIdQuery';
import { PostChatMutation } from './postChatMutation';

export const chatApi = createApi({
  reducerPath: 'chatApi',
  tagTypes: ['Chats'],
  baseQuery: fetchBaseQuery(new BaseQuery()),

  endpoints: (build) => ({
    getChatsByUserId: build.query(new GetChatsByUserIdQuery()),
    getMessages: build.query(new GetMessagesByChatIdQuery()),
    // @ts-ignore all nice
    postChat: build.mutation(new PostChatMutation()),
  }),
});

export const { useGetChatsByUserIdQuery, useLazyGetMessagesQuery, usePostChatMutation } = chatApi;
