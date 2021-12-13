import React, { useState } from 'react'
import Togglable from './togglable'
import LoginForm from './loginForm'

const LogInAndInfo = ({ user, handleLogin, handleLogout }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  if (user !== null) {
    return (
      <div>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
        <br />
        <br />
      </div>
    )
  }
  return (
    <div>
      <Togglable buttonLabel="log in">
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable>
    </div>
  )
}

export default LogInAndInfo