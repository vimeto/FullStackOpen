const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')
/* const bcrypt = require('bcrypt') */
const User = require('../models/user')

describe('testing addition of users', () => {

  beforeEach(async () => {
    await User.deleteMany({})
    const userOneObj = new User(helper.initialUsers[0])
    const userTwoObj = new User(helper.initialUsers[1])
    await userOneObj.save()
    await userTwoObj.save()
    /* Add two users */
  })

  test('there are two users in db', async () => {
    const usersInStart = await helper.usersInDb()
    expect(usersInStart.length).toBe(2)
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'vimetoivonen',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

})

describe('testing blog posts in db', () => {
  let userDataArray = []

  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    userDataArray = []

    /* Adding users and storing tokens */
    for (const user of helper.initialUsers) {
      const resUser = await api
        .post('/api/users')
        .send(user)
      const resLogin = await api
        .post('/api/login')
        .send(user)
      const resultingObj = {
        user: resUser.body,
        token: resLogin.body.token
      }
      userDataArray.push(resultingObj)
    }

    for (const blog of helper.initialBlogPosts) {
      await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${userDataArray[0].token}`)
        .send(blog)
        /* console.log(res.body) */
    }
    /* console.log(userDataArray) */

  })


  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blog posts are returned', async () => {
    const blogs = await Blog.find({})

    /* console.log(blogs) */
    expect(blogs.length).toBe(helper.initialBlogPosts.length)
  })

  test('blog id key called id', async () => {
    const blogs = await helper.blogsInDb()
    for (const blog of blogs) {
      expect(blog.id).toBeDefined()
    }
  })

  test('if no value in like, it is defaulted to 0', async () => {
    const newBlog = {
      author: 'Maöldfjk',
      title: 'lösdfj',
      url: 'hmmm.com/hm',
      date: new Date()
    }
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${userDataArray[0].token}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const blogInQuestion = blogsAtEnd.filter(n => n.url === newBlog.url)[0]
    expect(blogInQuestion.likes).toBe(0)

  })

  test('a specific blog post is within the returned blog posts', async () => {
    const res = await api
      .get('/api/blogs')
    const contents = res.body.map(r => r.title)

    expect(contents).toContain('How is this fun?')
  })

  test('a valid blog can be added', async () => {
    const newBlog = {
      author: 'Maöldfjk',
      title: 'lösdfj',
      url: 'hmsaföljkmm.com/hm',
      likes: 1,
      date: new Date()
    }
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${userDataArray[0].token}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogPosts.length + 1)

    const contents = blogsAtEnd.map(r => r.title)
    expect(contents).toContain('lösdfj')
  })

  test('blog without url is not added', async () => {
    const newBlog = {
      author: 'Maöldfjk',
      title: 'lösdfj',
      likes: 1,
      date: new Date()
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${userDataArray[0].token}`)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogPosts.length)
  })

  test('invalid token leads to 401', async () => {
    const newBlog = {
      author: 'Maöldfjk',
      title: 'lösdfj',
      likes: 1,
      date: new Date()
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${userDataArray[0].token}aöldfj`)
      .send(newBlog)
      .expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogPosts.length)
  })

})

afterAll(async () => {
  mongoose.connection.close()
  await new Promise(resolve => setTimeout(() => resolve(), 500))
})