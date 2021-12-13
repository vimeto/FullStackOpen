import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const handleAuthorChange = (event) => setAuthor(event.target.value)
  const handleTitleChange = (event) => setTitle(event.target.value)
  const handleUrlChange = (event) => setUrl(event.target.value)

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      author,
      title,
      url
    })
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={addBlog}>
        <input
          id='form-author'
          value={author}
          onChange={handleAuthorChange}
          placeholder="Author"
        />
        <input
          id='form-title'
          value={title}
          onChange={handleTitleChange}
          placeholder="Title"
        />
        <input
          id='form-url'
          value={url}
          onChange={handleUrlChange}
          placeholder="Url"
        />
        <button id='form-submit' type="submit">save</button>
      </form>
    </div>

  )
}

export default BlogForm