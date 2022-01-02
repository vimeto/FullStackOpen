const listHelper = require('../utils/list_helper')

const blogs = [
  {
    'author': 'Vilhelm Toivonen',
    'title': 'Miten saada pillua',
    'url': 'pornhub.com',
    'likes': 1,
    'date': '2021-12-10T20:25:37.434Z',
    'id': '61b3b7c1445ad6f86842f79b'
  },
  {
    'author': 'Vilhelm Toivonen',
    'title': 'Miten en ole homo',
    'url': 'hmmmm.org/hmmm',
    'likes': 8,
    'date': '2021-12-10T20:25:56.999Z',
    'id': '61b3b7d4445ad6f86842f79f'
  },
  {
    'author': 'Aapo Leppänen',
    'title': 'Miksi osaan puhua',
    'url': 'google.com/google',
    'likes': 1,
    'date': '2021-12-10T20:26:13.382Z',
    'id': '61b3b7e5445ad6f86842f7a3'
  },
  {
    'author': 'Leo Leijona',
    'title': 'Lorem ipsum',
    'url': 'supersaa.fi/suomi',
    'likes': 1,
    'date': '2021-12-10T20:26:50.656Z',
    'id': '61b3b80a445ad6f86842f7a7'
  },
  {
    'author': 'Vilhelm Toivonen',
    'title': 'Hmmmmmm',
    'url': 'aödlkfja',
    'likes': 1,
    'date': '2021-12-10T20:27:08.140Z',
    'id': '61b3b81c445ad6f86842f7ab'
  }
]


test('dummy returns one', () => {

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

test('totalLikes returns 5', () => {
  const result = listHelper.totalLikes(blogs)
  expect(result).toBe(12)
})

test('favorite blog equals Toivonen by Vilhelm', () => {
  const result = listHelper.favoriteBlog(blogs)
  expect(result).toBe(blogs[1])
})

test('most blogs equals Vilhelm Toivonen', () => {
  const results = listHelper.mostBlogs(blogs)
  expect(results).toMatchObject({ author: 'Vilhelm Toivonen', blogs: 3 })
})

test('most lies equals Vilhelm Toivonen', () => {
  const results = listHelper.mostLikes(blogs)
  expect(results).toMatchObject({ author: 'Vilhelm Toivonen', likes: 10 })
})


