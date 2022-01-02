import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { likeBlogActionCreator, deleteBlogActionCreator } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

/* import Blog from './blog' */

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const [expanded, setExpanded] = useState(false)

  const toggleExpanded = () => setExpanded(!expanded)
  const showWhenExpanded = { display: expanded ? '' : 'none' }
  const marginStyle = {
    margin: '20px 0',
    backgroundColor: '#fff',
    padding:'10px',
    textAlign:'cetner',
    borderRadius:'10px',
    boxShadow:'0 0 5px #bbb',
    border: '1px solid #444',
    overflow: 'hidden'
  }

  const onLike = (blog) => {
    dispatch(likeBlogActionCreator(blog))
  }

  const onDelete = (blog) => {
    if (!window.confirm('Do you want to delete this post?')) { return }
    dispatch(deleteBlogActionCreator(blog))
  }
  const rightMargin = {
    float: 'right'
  }

  return (
    <div className='blog-master-class' style={marginStyle}>
      <div id='blog-title'>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link> <Button style={rightMargin} size='sm' onClick={toggleExpanded}>{expanded ? 'hide' : 'view'}</Button>
      </div>
      <div style={showWhenExpanded} className='blog-expandable'>
        <div id='blog-url'>{blog.url}</div>
        <div id='blog-likes'>
          likes {blog.likes} <Button variant='outline-primary' size='sm' onClick={() => onLike(blog)}>like</Button>
        </div>
        <div id='blog-author'>{blog.author}</div>
        <Button variant='danger' size='sm' onClick={() => onDelete(blog)}>remove</Button>
      </div>

    </div>
  )
}

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)

  return (
    <div>
      {blogs.sort((a, b) => a.likes < b.likes ? 1 : a.likes > b.likes ? -1 : 0)
        .map(blog => (
          <Blog key={blog.id} blog={blog} />
        ))}
    </div>
  )
}

export default BlogList