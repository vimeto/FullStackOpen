import React from "react"

const Form = ({ formSubmit, newName, newPhone, nameHandler, phoneHandler }) => (
    <>
      <h2>add a new</h2>
      <form onSubmit={formSubmit}>
        <div>
          name: <input value={newName} onChange={nameHandler} />
        </div>
        <div>
          number: <input value={newPhone} onChange={phoneHandler} />
        </div>
        <button type="submit">add</button>
      </form>
    </>
  
  )

  export default Form