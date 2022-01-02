import React from 'react'
import { useSelector } from 'react-redux'

const InfoMessage = () => {
  const notification = useSelector(state => state.notification)
  if (!notification) { return null }

  const styleObj = {
    width: '95%',
    margin: '0 auto 20px auto',
    border: `2px solid ${notification.color}`,
    padding: '10px 20px',
    textAlign: 'center',
    borderRadius: '10px',
    backgroundColor: '#fff'
  }
  return <div style={styleObj}>{notification.text}</div>
}

export default InfoMessage