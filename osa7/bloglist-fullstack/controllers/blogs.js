const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
/* const User = require('../models/user')
const jwt = require('jsonwebtoken') */
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog
    .find({}).populate('user')
  res.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  if (blog) {
    res.json(blog)
  }
  else {
    res.status(400).end()
  }
})

blogsRouter.delete('/:id', middleware.userExtractor, async (req, res) => {

  const user = req.user
  const blog = await Blog.findById(req.params.id)

  if (blog.user.toString() !== user._id.toString()) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }
  user.blogs = user.blogs.filter(n => n._id !== blog._id)
  await blog.delete()
  await user.save()
  res.status(204).end()
})

blogsRouter.post('/', middleware.userExtractor, async (req, res) => {
  const body = req.body

  const user = req.user

  const blog = new Blog({
    author: body.author,
    title: body.title,
    url: body.url,
    likes: 'likes' in body ? body.likes : 0,
    date: new Date(),
    user: user._id,
    comments: []
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  res.json(savedBlog.toJSON())
})

blogsRouter.put('/:id', async (req, res) => {
  const body = req.body

  const blog = {
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes
  }

  const savedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
  res.json(savedBlog.toJSON())
})

blogsRouter.post('/:id/comments', async (req, res) => {
  const comment = req.body.comment
  const id = req.params.id

  const savedBlog = await Blog.findById(id)
  const newBlog = {
    comments: savedBlog.comments.concat(comment)
  }

  const returnedBlog = await Blog.findByIdAndUpdate(id, newBlog, { new: true })
  res.json(returnedBlog.toJSON())
})

module.exports = blogsRouter