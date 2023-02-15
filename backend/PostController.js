import Post from './Post.js'

class PostController {
  async create(req, res) {
    try {
      const { author, title, content, picture } = req.body
      const post = await Post.create({ author, title, content, picture })
      return res.json(post)
    } catch (e) {
      return res.status(500).json(e)
    }
  }
  async getAll(req, res) {
    try {
      const posts = await Post.find()
      return res.json(posts)
    } catch (e) {
      return res.status(500).json(e)
    }
  }
  async getById(req, res) {
    try {
      const { id } = req.params
      if(!id){
        return res.status(400).json({message:'id not found'})
      }
      const post = await Post.findById(id)
      return res.json(post)
    } catch (e) {
      return res.status(500).json(e)
    }
  }
  async update(req, res) {
    try {
    } catch (e) {
      return res.status(500).json(e)
    }
  }
  async delete(req, res) {
    try {
    } catch (e) {
      return res.status(500).json(e)
    }
  }
}

export default new PostController()
