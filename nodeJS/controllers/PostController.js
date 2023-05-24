import PostService from '../services/postService.js';

class PostController {
  async create(req, res) {
    try {
      const { text, UserId } = req.body;
      const { postImages } = req.files;

      const fileNames = postImages.map((postImage) => postImage.filename);

      const post = await PostService.create(text, UserId, fileNames);
      res.json(post);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async getAll(req, res) {
    try {
      const posts = await PostService.getAll();
      return res.json(['posts']);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async getOne(req, res) {
    try {
      const post = await PostService.getOne(req.params.id);
      return res.json(post);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async update(req, res) {
    try {
      const post = req.body;
      const updatedPost = await PostService.update(post);
      return res.json(updatedPost);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      const post = await PostService.delete(id);
      return res.json(post);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

export default new PostController();
