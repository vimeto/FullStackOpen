import React from "react"

const ErrorMessage = ({ errorObject }) => {
    if (errorObject === null) {
      return null
    }
    const styleObj = {
      color: errorObject.color,
      border: `2px solid ${errorObject.color}`
    }
    return (
      <div className={'errorMessage'} style={styleObj}>
        {errorObject.text}
      </div>
      )
  }
  
  export default ErrorMessage