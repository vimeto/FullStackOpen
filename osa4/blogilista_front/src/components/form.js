import React from "react"

const Form = ({ formSubmit, newAuthor, newTitle, newUrl, authorHandler, titleHandler, urlHandler }) => (
    <div className="new-blog-form-div">
      <h2>Add a New blog</h2>
      <div className="new-blog-form">
        <form onSubmit={formSubmit}>
          <div>
            <input value={newAuthor} onChange={authorHandler} placeholder="Author" />
          </div>
          <div>
            <input value={newTitle} onChange={titleHandler} placeholder="Title" />
          </div>
          <div>
            <input value={newUrl} onChange={urlHandler} placeholder="Url" />
          </div>
          <button type="submit">add</button>
        </form>
      </div>
    </div>
  
  )


  export default Form    