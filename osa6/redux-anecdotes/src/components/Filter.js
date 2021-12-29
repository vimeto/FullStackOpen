import React from "react"
import { useDispatch } from "react-redux"
import { filterChange } from "../reducers/filterReducer"

const Filter = () => {
  const dispatch = useDispatch()

  const onFilterChange = (event) => {
    /* console.log(event.target.value) */
    dispatch(filterChange(event.target.value))
  }

  const style = {
    marginBottom: 10
  }


  return (
    <div style={style}>
      filter <input name='filter' onChange={onFilterChange} />
    </div>
  )
}

export default Filter