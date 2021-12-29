import React from "react"
import { connect } from 'react-redux'
import { addAnecdote } from "../reducers/anecdoteReducer"


const AnecdoteForm = (props) => {

  const addAnec = async (event) => {
    event.preventDefault()
    const content = event.target.anec.value
    event.target.anec.value = ''
    props.addAnecdote(content)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnec}>
        <div><input name='anec'/></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  addAnecdote
}

const ConnectedAnecdoteForm = connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)
export default ConnectedAnecdoteForm