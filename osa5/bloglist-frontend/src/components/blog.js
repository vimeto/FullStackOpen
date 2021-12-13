import React, { useState } from 'react'

const Blog = ({ blog, onLikeBlog, onDeleteBlog }) => {
  const [expanded, setExpanded] = useState(false)

  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  const showWhenExpanded = { display: expanded ? '' : 'none' }
  const marginStyle = {
    margin: '30px 0',
    backgroundColor: '#ddd',
    padding:'10px',
    textAlign:'cetner',
    borderRadius:'10px',
    boxShadow:'0 0 10px #bbb',
    border: '1px solid #444'
  }

  return (
    <div className='blog-master-class' style={marginStyle}>
      <div id='blog-title'>
        {blog.title} <button id='blog-togglevisibility' onClick={toggleExpanded}>{expanded ? 'hide' : 'view'}</button>
      </div>
      <div style={showWhenExpanded} className='blog-expandable'>
        <div id='blog-url'>{blog.url}</div>
        <div id='blog-likes'>
          likes {blog.likes} <button id='blog-like' onClick={() => onLikeBlog(blog)}>like</button>
        </div>
        <div id='blog-author'>{blog.author}</div>
        <button id='blog-delete' onClick={() => onDeleteBlog(blog)}>remove</button>
      </div>

    </div>
  )
}

export default Blog