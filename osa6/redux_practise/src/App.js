import React, { useEffect } from "react"
import NewNote from './components/newNote'
import Notes from './components/notes'
import VisibilityFilter from "./components/visibilityFilter"

import noteService from './services/notes'
import { initializeNotes } from "./reducers/noteReducer"
import { useDispatch } from "react-redux"

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeNotes())
  }, [dispatch])

  return (
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  )
}


export default App