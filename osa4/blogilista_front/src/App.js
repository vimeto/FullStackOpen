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
      console.log("There was an error handling your request.")
      handleChangingErrorMessage("There was an error handling your request.", "red")
    })
  }

  /* const onDeleteButtonClick = (id) => {
    const personToBeDeleted = persons.find(n => n.id === id)

    if (window.confirm(`Do you really want to delete ${personToBeDeleted.name}?`)) {
      blogService
        .del(id)
        .then(response => {
          console.log("delete promise fulfilled")
          handleChangingErrorMessage(`${personToBeDeleted.name} deleted successfully`, "green")
          setPersons( persons.filter(person => person.id !== id))
          console.log(persons)
        })
        .catch(response => {
          handleChangingErrorMessage(`${personToBeDeleted.name} seems to have been deleted elsewhere...`, "red")
          setPersons( persons.filter(person => person.id !== personToBeDeleted.id))
        })
    }
    
  } */

  return (
    <div>
      <h1>Blogs</h1>
      <ErrorMessage errorObject={errorMessage} />
      <Form formSubmit={addBlog} newAuthor={newAuthor} newTitle={newTitle} newUrl={newUrl} authorHandler={handleAuthorChange} titleHandler={handleTitleChange} urlHandler={handleUrlChange} />
      {/* <BlogList persons={persons} newFilter={newFilter} onDeleteButtonClick={onDeleteButtonClick} /> */}
    </div>
  )

}

export default App
