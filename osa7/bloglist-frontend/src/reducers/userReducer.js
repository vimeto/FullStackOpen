import blogService from '../services/blogs'
import loginService from '../services/login'

const userReducer = (state = {}, action) => {
  switch (action.type) {
  case 'SET_USER':
    return action.data
  default:
    return state
  }
}

export const setUserActionCreator = (data) => {
  return async dispatch => {
    dispatch({
      type: 'SET_USER',
      data
    })
  }
}

export const setNewUserActionCreator = (username, password) => {
  return async dispatch => {
    console.log(username, password)
    const user = await loginService.login({ username, password })
    window.localStorage.setItem(
      'loggedBlogAppUser',JSON.stringify(user)
    )
    blogService.setToken(user.token)
    await dispatch({
      type: 'SET_USER',
      data: user
    })
    return user
  }
}

export default userReducer