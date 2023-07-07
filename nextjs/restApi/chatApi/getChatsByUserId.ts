export class GetChatsByUserIdQuery {
  query = (UserId) => `chats/${UserId}`;
}
