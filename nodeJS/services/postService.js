import { Post, PostImage, User } from '../models/models.js';

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

  async getAllByUserId(id) {
    const posts = await User.findAll({
      where: { id },
      include: [
        {
          model: Post,
        },
      ],
    });
    return posts;
  }

  async update(id, text) {
    if (!id) {
      throw new Error('Id не указан');
    }
    await Post.update(
      { text },
      {
        where: {
          id,
        },
      },
    );

    const updatedPost = await Post.findOne({ where: id });

    return updatedPost;
  }

  async delete(id) {
    if (!id) {
      throw new Error('Id не указан');
    }
    const post = await Post.destroy({ where: { id } });
    return post;
  }
}

export default new PostService();
