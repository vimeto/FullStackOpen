import React from "react"
import { connect } from 'react-redux'
import { filterChange } from "../reducers/filterReducer"

const Filter = (props) => {

  const onFilterChange = (event) => {
    /* console.log(event.target.value) */
    props.filterChange(event.target.value)
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

const mapDispatchToProps = {
  filterChange
}

const ConnectedFilter = connect(
  null,
  mapDispatchToProps
)(Filter)

export default ConnectedFilter