import { transformDate } from '../../utils/transformDate';

export interface postDTO {
  id: string;
  text?: string;
  images?: string[];
  date: string;
  isUpdated: boolean;
}

export class PostConstructor {
  public post: postDTO = {
    id: '',
    text: '',
    date: '',
    isUpdated: false,
    images: [],
  };

  constructor(data: any) {
    try {
      this.post.id = data.id;
      this.post.text = data.text;
      this.post.isUpdated = data.createdAt !== data.updatedAt;
      this.post.date = transformDate(data.updatedAt);
      this.post.images = data.PostImages.map(
        (imageObj) => process.env.NEXT_PUBLIC_IMAGES_URL + imageObj.image,
      );
    } catch (e) {
      console.error(e);
    }
  }

  getField() {
    return this.post;
  }
}
