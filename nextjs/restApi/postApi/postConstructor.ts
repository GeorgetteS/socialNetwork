import { transformDate } from '../../utils/transformDate';

export interface postDTO {
  id: number;
  text?: string;
  images?: string[];
  date: string;
  isUpdated: boolean;
  UserId: number;
  userName: string;
  userAvatar?: string;
}

export class PostConstructor {
  public post: postDTO = {
    id: null,
    text: '',
    date: '',
    isUpdated: false,
    images: [],
    UserId: null,
    userName: '',
    userAvatar: '',
  };

  constructor(data: any) {
    try {
      this.post.id = data.id;
      this.post.text = data.text;
      this.post.isUpdated = data.createdAt !== data.updatedAt;
      this.post.date = transformDate(data.updatedAt);
      this.post.images = data.PostImages.map((imageObj) => imageObj.image);
      this.post.UserId = data.User;
      this.post.userName = data.User.name + ' ' + data.User.surname;
      this.post.userAvatar = data.User.img && data.User.img;
    } catch (e) {
      console.error(e);
    }
  }

  getField() {
    return this.post;
  }
}
