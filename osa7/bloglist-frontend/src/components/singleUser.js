import React from 'react'
import { Link } from 'react-router-dom'

const SingleUser = ({ user }) => {
  console.log('In Single User', user)
  if (!user) return null
  return (
    <div>
      <h2>{user.name}</h2>
      <p><b>added blogs</b></p>
      <p>{user.blogs.length === 0 ? 'no blogs yet' : ''}</p>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></li>
        ))}
      </ul>
    </div>
  )
}

export default SingleUser