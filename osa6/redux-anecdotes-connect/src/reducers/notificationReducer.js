const initialState = {
  notification: '',
  timeOutKey: ''
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return {
        ...state,
        notification: action.notification
      }
    default:
      return state
  }
}

export const notificationChange = (notification, timeSeconds) => {
  return async dispatch => {
    await dispatch({
      type: 'SET_NOTIFICATION',
      notification
    })
    return setTimeout(() => dispatch({
      type: 'SET_NOTIFICATION',
      notification: ''
    }), timeSeconds * 1000 )
  }  
}
export const notificationEmpty = () => {
  return {
    type: 'SET_NOTIFICATION',
    notification: ''
  }
}

export default notificationReducer