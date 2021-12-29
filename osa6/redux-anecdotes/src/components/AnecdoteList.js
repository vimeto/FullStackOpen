import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange, notificationEmpty } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const filter = useSelector(state => state.filter)
  const anecdotes = useSelector(state => state.anecdotes).filter(anec => anec.content.toLowerCase().includes(filter.toLowerCase()))
  const dispatch = useDispatch()

  const vote = (id) => {
    const votedAnecdote = anecdotes.find(n => n.id === id)
    dispatch(notificationChange(`You voted '${votedAnecdote.content}'`, 10))
    dispatch(voteAnecdote(id))
  }

  return (
    <div>
      {anecdotes.sort((a, b) => (a.votes < b.votes) ? 1 : (a.votes === b.votes) ? 0 : -1).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList