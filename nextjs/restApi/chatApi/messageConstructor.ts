import { transformDate } from '../../utils/transformDate';

export interface messageDTO {
  id: string;
  content: string;
  ChatId: number;
  UserId: number;
  userAvatar?: string;
  userName: string;
  isUpdated: boolean;
  date: string;
}

export class messageConstructor {
  public message: messageDTO = {
    id: '',
    content: '',
    ChatId: null,
    UserId: null,
    userName: '',
    userAvatar: 'noAvatar.svg',
    isUpdated: false,
    date: '',
  };

  constructor(data: any) {
    try {
      this.message.id = data.id;
      this.message.content = data.content;
      this.message.isUpdated = data.createdAt !== data.updatedAt;
      this.message.ChatId = data.ChatId;
      this.message.UserId = data.UserId;
      this.message.userName = data.User.name + ' ' + data.User.surname;
      this.message.userAvatar = data.User.img && data.User.img;
      this.message.date = transformDate(data.updatedAt);
    } catch (e) {
      console.error(e);
    }
  }

  getField() {
    return this.message;
  }
}
