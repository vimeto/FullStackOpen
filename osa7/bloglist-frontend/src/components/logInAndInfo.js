import React from 'react'
import { useField } from '../hooks/index'
import { useSelector, useDispatch } from 'react-redux'
import { setNewUserActionCreator, setUserActionCreator } from '../reducers/userReducer'
import { notificationChange } from '../reducers/notificationReducer'
import { Button } from 'react-bootstrap'

const LogInAndInfo = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const username = useField('text', 'username')
  const password = useField('password', 'password')

  const onSubmit = (event) => {
    event.preventDefault()

    try {
      dispatch(setNewUserActionCreator(username.toInput.value, password.toInput.value)).then((u) => {
        dispatch(notificationChange({
          text: `${u.name} logged in`,
          color: 'green'
        }))
      })
    }
    catch (exception) {
      dispatch(notificationChange({
        text: 'Wrong credentials',
        color: 'red'
      }))
    }
  }

  const onLogout = () => {
    window.localStorage.clear()
    dispatch(setUserActionCreator(null))
  }

  if (!(user === null || Object.keys(user).length === 0)) {
    return (
      <div>
        {user.name} logged in <Button size='sm' onClick={onLogout}>logout</Button>
        <br />
      </div>
    )
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input {...username.toInput}/>
        <input {...password.toInput} />
        <Button size='sm' type='submit'>log in</Button>
      </form>
    </div>
  )
}

export default LogInAndInfo