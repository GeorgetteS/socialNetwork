import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BaseQuery } from '../BaseQuery';
import { GetChatsByUserIdQuery } from './getChatsByUserId';
import { GetMessagesByChatIdQuery } from './getMessagesByChatIdQuery';

export const chatApi = createApi({
  reducerPath: 'chatApi',
  tagTypes: ['chats'],
  baseQuery: fetchBaseQuery(new BaseQuery()),

  endpoints: (build) => ({
    getChatsByUserId: build.query(new GetChatsByUserIdQuery()),
    getMessages: build.query(new GetMessagesByChatIdQuery()),

    //@ts-ignore all nice
    //  deletePost: build.query(new GetPostsByUserIdQuery()),
  }),
});

export const { useGetChatsByUserIdQuery, useLazyGetMessagesQuery } = chatApi;
