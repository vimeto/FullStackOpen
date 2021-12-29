import React from "react"
import { filterChange } from "../reducers/filterReducer"
import { useDispatch } from "react-redux"

const VisibilityFilter = () => {
  const dispatch = useDispatch()

  const filterSelected = (value) => {
    dispatch(filterChange(value))
  }

  return (
    <div>
      all           <input type='radio' name='filter' onChange={() => filterSelected('ALL')} />
      important     <input type='radio' name='filter' onChange={() => filterSelected('IMPORTANT')} />
      nonimportant  <input type='radio' name='filter' onChange={() => filterSelected('NONIMPORTANT')} />
    </div>
  )
}

export default VisibilityFilter