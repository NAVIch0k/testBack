import PostService from '../../Services/Post/PostService.js'

class PostController {
  async create(req, res) {
    try {
      const post = await PostService.create(req.body)
      return res.json(post)
    } catch (e) {
      return res.status(500).json(e)
    }
  }
  async getAll(req, res) {
    try {
      const posts = await PostService.getAll()
      return res.json(posts)
    } catch (e) {
      return res.status(500).json(e)
    }
  }
  async getById(req, res) {
    try {
      const post = await PostService.getById(req.params.id)
      return res.json(post)
    } catch (e) {
      return res.status(500).json(e)
    }
  }
  async update(req, res) {
    try {
      const updatePost = await PostService.update(req.body,req.params.id)
      return res.json(updatePost)
    } catch (e) {
      return res.status(500).json(e)
    }
  }
  async delete(req, res) {
    try {
      await PostService.delete(req.params.id)
      return res.status(200).json()
    } catch (e) {
      return res.status(500).json(e)
    }
  }
}

export default new PostController()
