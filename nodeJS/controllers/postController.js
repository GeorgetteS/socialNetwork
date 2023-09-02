import PostService from '../services/postService.js';

class PostController {
  async create(req, res) {
    try {
      const { text, UserId } = req.body;
      const { postImages } = req.files;
      console.log(postImages, 'sdd');
      let fileNames;
      if (postImages) {
        fileNames = postImages.map((postImage) => postImage.path);
      }

      const post = await PostService.create(text, UserId, fileNames);
      res.json(post);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async getPostsByUserId(req, res) {
    try {
      const { id } = req.params;
      const posts = await PostService.getPostsByUserId(id);
      return res.json(posts);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async update(req, res) {
    try {
      const { id, text } = req.body;
      const updatedPost = await PostService.update(id, text);
      return res.json(updatedPost);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      const post = await PostService.delete(id);
      return res.json(post);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async createComment(req, res) {
    try {
      const { PostId, UserId, text } = req.body;

      const comment = await PostService.createComment(PostId, UserId, text);
      return res.json(comment);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async updateComment(req, res) {
    try {
      const { id, text } = req.body;
      const comment = await PostService.updateComment(id, text);
      return res.json(comment);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async deleteComment(req, res) {
    try {
      const { id } = req.params;

      const comment = await PostService.deleteComment(id);
      return res.json(comment);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async like(req, res) {
    try {
      const { UserId, PostId } = req.body;
      const like = await PostService.setLike(UserId, PostId);
      return res.json(like);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async unLike(req, res) {
    try {
      const { id } = req.params;

      const like = await PostService.deleteLike(id);
      return res.json(like);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
}

export default new PostController();
