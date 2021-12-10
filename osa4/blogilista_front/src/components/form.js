import React from "react"

const Form = ({ formSubmit, newAuthor, newTitle, newUrl, authorHandler, titleHandler, urlHandler }) => (
    <>
      <h2>Add a New blog</h2>
      <form onSubmit={formSubmit}>
        <div>
          author: <input value={newAuthor} onChange={authorHandler} />
        </div>
        <div>
          title: <input value={newTitle} onChange={titleHandler} />
        </div>
        <div>
          url: <input value={newUrl} onChange={urlHandler} />
        </div>
        <div>
          {newAuthor} {newTitle} {newUrl}
        </div>
        <button type="submit">add</button>
      </form>
    </>
  
  )

  export default Form    