import anecdoteService from '../services/anecdotes'

export const addAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'ADD_ANECDOTE',
      data: newAnecdote
    })
  }
}
export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}
export const voteAnecdote = (id) => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    const anecdote = anecdotes.find(n => n.id === id)
    const newAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    const nAnecdote = await anecdoteService.update(newAnecdote)
    dispatch({
      type: 'VOTE_ANECDOTE',
      data: { id }
    }) 
  }
}

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE_ANECDOTE':
      const id = action.data.id
      const anec = state.find(n => n.id === id)
      const newAnec = {
        ...anec,
        votes: anec.votes + 1
      }
      return state.map(a => a.id === id ? newAnec : a)
    case 'ADD_ANECDOTE':
      return state.concat(action.data)
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export default anecdoteReducer