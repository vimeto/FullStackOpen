import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/blog'
import BlogForm from './components/blogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/togglable'
import LogInAndInfo from './components/logInAndInfo'

const InfoMessage = ({ data }) => {
  if (!data) {
    return <></>
  }
  const styleObj = {
    width: '100%',
    border: data.color === 'red' ? '2px solid red' : 'solid green',
    padding: '10px 20px',
    textAlign: 'center',
    borderRadius: '10px',
    backgroundColor: '#ccc'
  }
  return <div className='main-info-message' style={styleObj}>{data.text}</div>
}

const BlogList = ({ blogs, onBlogLike, onDeleteBlog }) => {
  const blogList = blogs.sort((a, b) => {
    if (a.likes < b.likes) return 1
    else if (a.likes > b.likes) return -1
    return 0
  })

  return blogList.map(blog => (
    <Blog key={blog.id} blog={blog} onLikeBlog={onBlogLike} onDeleteBlog={onDeleteBlog} />
  ))
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [infoMessage, setInfoMessage] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    const username = event.target[0].value
    const password = event.target[1].value

    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogAppUser',JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setInfoMessage({
        text: `${user.name} logged in`,
        color: 'green'
      })
      setTimeout(() => {
        setInfoMessage(null)
      }, 5000)
    }
    catch (exception) {
      setInfoMessage({
        text: 'Wrong credentials',
        color: 'red'
      })
      setTimeout(() => {
        setInfoMessage(null)
      }, 5000)
    }

  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const handleInfoMessageChange = (text, color) => {
    setInfoMessage({
      text,
      color
    })
    setTimeout(() => {
      setInfoMessage(null)
    }, 5000)
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        handleInfoMessageChange(`${returnedBlog.title} added`, 'green')
        setBlogs(blogs.concat(returnedBlog))
      })
      .catch(err => {
        handleInfoMessageChange(err.message, 'red')
      })
  }

  const likeBlog = (blog) => {
    /* console.log('Post liked', blog.id) */
    const newBlog = blog
    newBlog.likes += 1
    blogService
      .update(blog.id, newBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(b => {
          if (b.id === blog.id) {
            return returnedBlog
          }
          else return b
        }))
      })
      .catch(err => {
        console.log(err)
      })
  }

  const deleteBlog = (blog) => {
    if (!(window.confirm(`Do you really want to delete the blog ${blog.title}?`))) {
      return null
    }
    blogService
      .del(blog.id)
      .then(() => {
        setBlogs(blogs.filter(b => b.id !== blog.id))
        handleInfoMessageChange(`${blog.title} deleted`, 'green')
      })
      .catch(err => {
        if (err.response.status === 401) {
          handleInfoMessageChange('You cannot delete other users blog posts', 'red')
        }
        else {
          handleInfoMessageChange('This blog post might have been deleted elsewhere... Try to refresh', 'red')
        }
      })
  }

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef} >
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  return (
    <div>
      <h1>blogs</h1>
      <InfoMessage data={infoMessage} />
      <LogInAndInfo user={user} handleLogin={handleLogin} handleLogout={handleLogout}/>
      {user !== null ? blogForm() : <p>You must log in to add new notes</p>}

      <div>
        <BlogList blogs={blogs} onBlogLike={likeBlog} onDeleteBlog={deleteBlog}/>
      </div>
    </div>
  )
}

export default App