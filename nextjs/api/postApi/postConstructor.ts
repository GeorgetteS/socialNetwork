import { postDTO } from '../dto/post.dto';

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
      this.post.date = data.updatedAt;
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
