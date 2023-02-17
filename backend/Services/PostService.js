import Post from '../Models/PostModel.js'

class PostService {
  async create(post) {
    const createdPost = await Post.create(post)
    return createdPost
  }
  async getAll() {
    const posts = await Post.find()
    return posts
  }
  async getById(id) {
    if (!id) {
      throw new Error('id not found')
    }
    const post = await Post.findById(id)
    return post
  }
  async update(post,id) {
    if (!id) {
      throw new Error('id not found')
    }
    const updatePost = await Post.findByIdAndUpdate(id, post, {
      new: true
    })
    return updatePost
  }
  async delete(id) {
    if (!id) {
        throw new Error('id not found')
    }
    await Post.findByIdAndDelete(id)
  }
}

export default new PostService()
