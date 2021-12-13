import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = (
  {
    handleSubmit,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password
  }) => {

  return (
    <div>
      <h1>log in</h1>
      <form onSubmit={handleSubmit}>
        <div>
          username <input
            id='login-username'
            type="text"
            value={username}
            name="Username"
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password <input
            id='login-password'
            type="password"
            value={password}
            name="Password"
            onChange={handlePasswordChange} />
        </div>
        <button id='login-button' type="submit">login</button>

      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm