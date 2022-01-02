import React, { useRef } from 'react'
import Togglable from '../utils/togglable'
import { useSelector } from 'react-redux'
import { useField } from '../../hooks'
import blogService from '../../services/blogs'
import { useDispatch } from 'react-redux'
import { notificationChange } from '../../reducers/notificationReducer'
import { addNewBlog } from '../../reducers/blogReducer'
import { Button } from 'react-bootstrap'

const BlogFormIfUser = () => {
  const author = useField('text', 'author')
  const title = useField('text', 'title')
  const url = useField('text', 'url')
  const ref = useRef()
  const dispatch = useDispatch()

  const addBlog = (event) => {
    ref.current.toggleVisibility()
    event.preventDefault()
    const blogObject = {
      author: author.toInput.value,
      title: title.toInput.value,
      url: url.toInput.value
    }
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        dispatch(notificationChange({
          text: `${returnedBlog.title} added`,
          color: 'green'
        }))
        dispatch(addNewBlog(returnedBlog))
      })
      .catch(err => {
        dispatch(notificationChange({
          text: err.message,
          color: 'red'
        }))
      })
    author.onClear()
    title.onClear()
    url.onClear()

  }

  return (
    <Togglable buttonLabel='new blog' ref={ref}>
      <div>
        <h2>Save a new blog</h2>
        <form onSubmit={addBlog}>
          <input {...title.toInput}/>
          <input {...author.toInput}/>
          <input {...url.toInput}/>
          <Button style={{ marginLeft: '5px' }} variant='outline-success' type="submit">save</Button>
        </form>
      </div>
    </Togglable>
  )
}

const BlogForm = ({ createBlog }) => {
  const user = useSelector(state => state.user)
  if ((user === null || Object.keys(user).length === 0)) {
    return <p>You must log in to add new notes</p>
  }
  return <BlogFormIfUser createBlog={createBlog} />
}

export default BlogForm