import { Post, PostComment, PostImage, PostLike, User } from '../models/models.js';

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

  async getPostsByUserId(id) {
    if (!id) {
      throw new Error('Id не указан');
    }
    const posts = await Post.findAll({
      where: {
        UserId: id,
      },
      include: {
        model: PostImage,
        as: 'PostImages',
        attributes: ['image'],
      },
      order: [['updatedAt', 'DESC']],
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

  async createComment(PostId, UserId, text) {
    const createdComment = await PostComment.create({ text, UserId, PostId });

    return createdComment;
  }

  async updateComment(id, text) {
    await PostComment.update(
      { text },
      {
        where: {
          id,
        },
      },
    );

    const updatedComment = await PostComment.findOne({ where: id });

    return updatedComment;
  }

  async deleteComment(id) {
    if (!id) {
      throw new Error('Id не указан');
    }
    const deletedComment = await PostComment.destroy({ where: { id } });
    return deletedComment;
  }

  async setLike(UserId, PostId) {
    const createdComment = await PostLike.create({ UserId, PostId });

    return createdComment;
  }

  async deleteLike(id) {
    if (!id) {
      throw new Error('Id не указан');
    }
    const deletedComment = await PostLike.destroy({ where: { id } });
    return deletedComment;
  }
}

export default new PostService();
