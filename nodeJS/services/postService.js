import { Post, PostImage } from '../models/models.js';

class PostService {
  async create(text, UserId, fileNames) {
    const createdPost = await Post.create({ text, UserId });

    if (!fileNames) {
      return createdPost;
    }

    const images = fileNames.map((image) => {
      return { image, PostId: createdPost.id };
    });

    const postImages = await PostImage.bulkCreate(images);

    return { createdPost, postImages };
  }

  async getAll() {
    const posts = await Post.find();
    return posts;
  }

  async getOne(id) {
    if (!id) {
      throw new Error('Id не указан');
    }
    const post = await Post.findById(id);
    return post;
  }

  async update(post) {
    if (!post._id) {
      throw new Error('Id не указан');
    }
    const updatedPost = await Post.findByIdAndUpdate(post._id, post, { new: true });
    return updatedPost;
  }

  async delete(id) {
    if (!id) {
      throw new Error('Id не указан');
    }
    const post = await Post.findByIdAndDelete(id);
    return post;
  }
}

export default new PostService();
