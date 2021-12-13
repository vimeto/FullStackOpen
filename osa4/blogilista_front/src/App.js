import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import Form from './components/form'
import BlogList from './components/bloglist'
import ErrorMessage from './components/errormessage'


const App = () => {
  const [blogs, setBlogs] = useState([]) 
  const [newAuthor, setNewAuthor] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [ errorMessage, setErrorMessage ] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then(response => {
        console.log(response)
        setBlogs(response)
    })
  }, [])

  const handleAuthorChange = (event) => setNewAuthor(event.target.value)
  const handleTitleChange = (event) => setNewTitle(event.target.value)
  const handleUrlChange = (event) => setNewUrl(event.target.value)

  const handleChangingErrorMessage = (messageText, messageColor) => {
    const newErrorObject = {
      text:messageText,
      color:messageColor
    }
    setErrorMessage(newErrorObject)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }


  const addBlog = (event) => {
    event.preventDefault()
    if ( blogs.filter( blog => blog.url === newUrl ).length > 0 ) {
      console.log("Current blog already added.")
      return
    }
    const blogObj = {
      author: newAuthor,
      title: newTitle,
      url: newUrl
    }
    blogService
      .create(blogObj)
      .then(response => {
        /* console.log("post promise fulfilled") */
        handleChangingErrorMessage(`${blogObj.title} by ${blogObj.author} added successfully`, "green")
        setBlogs(blogs.concat(response))
        setNewAuthor('')
        setNewTitle('')
        setNewUrl('')
    })
    .catch(error => {
      console.log(error.message)

      handleChangingErrorMessage(error.message, "red")
    })
  }

  const onPostLike = (id) => {
    const blogLiked = blogs.find(n => n.id === id)
    const blog = {
      author: blogLiked.author,
      title: blogLiked.title,
      url: blogLiked.url,
      likes: blogLiked.likes + 1
    }

    blogService
      .update(id, blog)
      .then(response => {
        handleChangingErrorMessage(`${blogLiked.title} by ${blogLiked.author} liked successfully`, "green")
        const newBlogs = blogs.map(blog => (blog.id === id ? response : blog))
        setBlogs( newBlogs )
        /* console.log("persons", blogs) */
      })
      .catch(() => {
        handleChangingErrorMessage(`${blogLiked.title} like failed`, "red")
      })
    
  }

  return (
    <div>
      <h1>Blogs</h1>
      <ErrorMessage errorObject={errorMessage} />
      <Form formSubmit={addBlog} newAuthor={newAuthor} newTitle={newTitle} newUrl={newUrl} authorHandler={handleAuthorChange} titleHandler={handleTitleChange} urlHandler={handleUrlChange} />
      <BlogList blogs={blogs} onPostLike={onPostLike} />
    </div>
  )

}

export default App
