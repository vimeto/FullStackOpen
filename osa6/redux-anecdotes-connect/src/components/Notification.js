
import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const notification = props.notification.notification
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: notification && notification.notification !== '' ? '' : 'none'
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
    notification: state.notification
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification