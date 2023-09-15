import { IChat } from '../../components/chats/NewChat';

export class PostChatMutation {
  query = (chat: IChat) => ({
    url: `chats`,
    method: 'POST',
    body: chat,
  });

  invalidatesTags = ['Chats'];
}
