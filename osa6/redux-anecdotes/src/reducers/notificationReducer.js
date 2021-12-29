const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
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
    await new Promise(resolve => setTimeout( resolve, timeSeconds * 1000 ))
    dispatch({
      type: 'SET_NOTIFICATION',
      notification: ''
    }) 
  }  
}
export const notificationEmpty = () => {
  return {
    type: 'SET_NOTIFICATION',
    notification: ''
  }
}

export default notificationReducer