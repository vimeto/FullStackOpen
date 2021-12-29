import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { toggleImportanceOf } from "../reducers/noteReducer"

const Note = ({note, handleClick}) => {
  return (
    <li onClick={handleClick}>
      {note.content}
      <strong>{note.important ? ' important' : ''}</strong>
    </li>
  )
}

const Notes = () => {
  const dispatch = useDispatch()
  const notes = useSelector(state => {
    switch (state.filter) {
      case 'ALL':
        return state.notes
      case 'IMPORTANT':
        return state.notes.filter(note => note.important)
      case 'NONIMPORTANT':
        return state.notes.filter(note => !note.important)
      default:
        return {}
    }
  })
  return (
    <ul>
      {notes.map((note) => 
        <Note key={note.id}
          note={note}
          handleClick={() => dispatch(toggleImportanceOf(note.id))} />
      )}
    </ul>
  )
}

export default Notes