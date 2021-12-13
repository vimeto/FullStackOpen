import React from "react"

const BlogList = ({ blogs, onPostLike }) => (
    <div className="blog-list">
      <h2>List of blogs</h2>
      {blogs.map( (blog) => {
        return <Blog blog={blog} onPostLike={onPostLike} key={blog.id}/>
      })}
    </div>
  )
  
  const Blog = ({ blog, onPostLike }) => (
    <div className="blog-item">
      <p>{blog.title} by {blog.author}</p>
      <p>Link to blog {blog.url}</p>
      <p>Likes: {blog.likes}</p>
      <button onClick={() => onPostLike(blog.id)}>Like this blog post</button>
    </div>
  )

  export default BlogList