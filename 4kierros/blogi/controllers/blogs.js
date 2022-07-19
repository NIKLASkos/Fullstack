const blogsRouter = require('express').Router()
//const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1})
  response.json(blogs)
}) 
  
blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user
  
  if (!request.token || !user._id) {
    return response.status(401)
    .json({ error: 'token missing or invalid'})
  }

  if (!body.likes) body.likes = 0
  if (!body.url || !body.title) {
    return response.status(400).send( { error: 'missing title and/or url' } )
  }

  const blog = new Blog(
    {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    }
  )

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  return response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async ( request, response ) => {
  const id = request.params.id
  
  const user = request.user
  
  const blog = await Blog.findById(id)
  
  if (!(blog.user.toString() === user._id.toString())){
    return response.status(400).json({error: 'invalid token'})
  }
  
  const blogToDelete = await Blog.findByIdAndDelete(id)
  return response.status(204).json(blogToDelete)
})

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const body = await Blog.findById(id)
  console.log('body', body)

  const blogToChange = {
    _id: id,
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes + 1
  }
  
  const likesBeforeUpdate = blogToChange.likes
  console.log('changed', blogToChange)
  console.log('likes', likesBeforeUpdate)
  
  const updatedBlog = await Blog.findByIdAndUpdate(id, blogToChange)
  console.log('updated blog', updatedBlog)
  const updated = await Blog.findById(id)
  console.log('VIIMENEN', updated)
  return response.status(204).json(updated)
})

module.exports = blogsRouter