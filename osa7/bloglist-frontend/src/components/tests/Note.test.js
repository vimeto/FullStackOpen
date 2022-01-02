import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from '../blog'
import BlogForm from '../blogForm'

describe('<Blog />', () => {

  test('Testing whether author, title and url is rendered', () => {

    const likeBlog = jest.fn()
    const deleteBlog = jest.fn()
    const sampleBlog = {
      title: 'How to kill people',
      author: 'Vilelm Toivonen',
      url: 'ölsdfkjaöljk.com',
      likes: 1
    }

    const component = render(
      <Blog blog={sampleBlog} onLikeBlog={likeBlog} onDeleteBlog={deleteBlog} />
    )

    const blogAuthor = component.container.querySelector('#blog-author')
    const blogTitle = component.container.querySelector('#blog-title')
    const blogLikes = component.container.querySelector('#blog-likes')
    const blogUrl = component.container.querySelector('#blog-url')
    const blogExpandable = component.container.querySelector('.blog-expandable')

    expect(blogAuthor).toBeDefined()
    expect(blogTitle).toBeDefined()
    expect(blogLikes).toBeDefined()
    expect(blogUrl).toBeDefined()
    expect(blogExpandable).toBeDefined()

    expect(blogAuthor).not.toHaveStyle('display:none')
    expect(blogTitle).not.toHaveStyle('display:none')
    expect(blogLikes).not.toHaveStyle('display:none')
    expect(blogUrl).not.toHaveStyle('display:none')
    expect(blogExpandable).toHaveStyle('display:none')
  })

  test('Testing whether #blog-togglevisibility toggles visibility', () => {

    const likeBlog = jest.fn()
    const deleteBlog = jest.fn()
    const sampleBlog = {
      title: 'How to kill people',
      author: 'Vilelm Toivonen',
      url: 'ölsdfkjaöljk.com',
      likes: 1
    }

    const component = render(
      <Blog blog={sampleBlog} onLikeBlog={likeBlog} onDeleteBlog={deleteBlog} />
    )

    const blogExpandable = component.container.querySelector('.blog-expandable')
    const toggleVisibility = component.container.querySelector('#blog-togglevisibility')

    expect(blogExpandable).toBeDefined()
    expect(toggleVisibility).toBeDefined()

    expect(blogExpandable).toHaveStyle('display:none')

    fireEvent.click(toggleVisibility)

    expect(blogExpandable).not.toHaveStyle('display:none')
  })

  test('Testing wherher clicking like button twise registers two likes', () => {

    const likeBlog = jest.fn()
    const deleteBlog = jest.fn()
    const sampleBlog = {
      title: 'How to kill people',
      author: 'Vilelm Toivonen',
      url: 'ölsdfkjaöljk.com',
      likes: 1
    }

    const component = render(
      <Blog blog={sampleBlog} onLikeBlog={likeBlog} onDeleteBlog={deleteBlog} />
    )

    const likeButton = component.container.querySelector('#blog-like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(likeBlog.mock.calls).toHaveLength(2)

  })

})

describe('<BlogForm />', () => {

  test('Blogform responds with correct information once the form is sent', () => {
    const newBlog = {
      title: 'New blog title',
      author: 'Vilhelm Toivonen',
      url: 'google.com/google.com'
    }

    const createBlog = jest.fn()

    const component = render(
      <BlogForm createBlog={createBlog} />
    )

    const inputAuthor = component.container.querySelector('#form-author')
    const inputTitle = component.container.querySelector('#form-title')
    const inputUrl = component.container.querySelector('#form-url')
    const form = component.container.querySelector('form')

    fireEvent.change(inputAuthor, {
      target: { value: newBlog.author }
    })
    fireEvent.change(inputTitle, {
      target: { value: newBlog.title }
    })
    fireEvent.change(inputUrl, {
      target: { value: newBlog.url }
    })
    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].author).toBe(newBlog.author)
    expect(createBlog.mock.calls[0][0].title).toBe(newBlog.title)
    expect(createBlog.mock.calls[0][0].url).toBe(newBlog.url)

  })

})