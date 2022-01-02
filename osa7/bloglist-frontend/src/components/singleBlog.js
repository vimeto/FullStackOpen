import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { likeBlogActionCreator } from '../reducers/blogReducer'
import { useField } from '../hooks/index'
import { addCommentActionCreator } from '../reducers/blogReducer'
import { Button } from 'react-bootstrap'

const SingleBlog = () => {
  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()
  const id = useParams().id
  const newComment = useField('text', 'new comment')


  if (blogs.filter(b => b.id === id).length === 0) return null
  const blog = blogs.find(n => n.id === id)
  const likeBlog = () => {
    dispatch(likeBlogActionCreator(blog))
  }
  const submitNewComment = (e) => {
    e.preventDefault()
    const c = newComment.toInput.value
    newComment.onClear()
    dispatch(addCommentActionCreator(blog, c))
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} likes <Button size='sm' onClick={likeBlog}>like</Button>
      </div>
      <p>
        Added by {blog.author}
      </p>
      <p><b>comments</b></p>
      <div>
        <form onSubmit={submitNewComment}>
          <input {...newComment.toInput}/>
          <Button style={{ marginLeft: '5px' }} variant='outline-success' type='submit'>submit</Button>
        </form>
        <ul>
          {blog.comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
        <p>{blog.comments.length === 0 ? 'this post has no comments yet' : ''}</p>
      </div>
    </div>
  )
}

export default SingleBlog