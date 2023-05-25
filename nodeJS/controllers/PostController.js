import PostService from '../services/postService.js';

class PostController {
  async create(req, res) {
    try {
      const { text, UserId } = req.body;
      const { postImages } = req.files;
      let fileNames;
      if (postImages) {
        fileNames = postImages.map((postImage) => postImage.filename);
      }

      const post = await PostService.create(text, UserId, fileNames);
      res.json(post);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async update(req, res) {
    try {
      const { id, text } = req.body;
      const updatedPost = await PostService.update(id, text);
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
