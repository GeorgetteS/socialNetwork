import { messageConstructor } from './messageConstructor';

export class GetMessagesByChatIdQuery {
  query = (ChatId) => `chats/messages/${ChatId}`;

  transformResponse = (response) => {
    try {
      const messages = response.map((messagesData) =>
        new messageConstructor(messagesData).getField(),
      );

      return messages;
    } catch (e) {
      console.log(e);
    }
  };
}
