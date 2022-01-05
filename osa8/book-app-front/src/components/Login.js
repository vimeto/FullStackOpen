import React, { useState, useEffect } from 'react'
import { LOGIN } from '../queries/index'
import { useMutation } from '@apollo/client'

const Login = ({ show, setToken, setPage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [ loginUser, result ] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if (result.data) {
      const token =  result.data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)
      setUsername('')
      setPassword('')
      setPage('authors')
    }
  }, [result.data]) //eslint-disable-line

  if (!show) {
    return null
  }

  const submitLogin = async (event) => {
    event.preventDefault()
    
    loginUser({ variables: { username, password } })
  }

  return (
    <div style={{marginTop: '30px'}}>
      <h2>Log in</h2>
      <form onSubmit={submitLogin}>
        <div>
          <input
            placeholder='username' 
            value={username} 
            type='text' 
            onChange={(e) => setUsername(e.target.value)}
          />
          <input 
            placeholder='password' 
            value={password} 
            type='password' 
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type='submit'>log in</button>
      </form>
    </div>
  )
}

export default Login