import React from 'react'
import { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, CHANGE_BORN } from '../queries'
import Select from 'react-select'

/* const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
] */

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)
  const [birthYear, setBirthYear] = useState('')
  const [selectedOption, setSelectedOption] = useState(null)
  const [ changeBorn ] = useMutation(CHANGE_BORN, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  if (!props.show) {
    return null
  }
  if (result.loading) {
    return <div>loading...</div>
  }
  const authors = result.data.allAuthors
  const options = authors.map(a => ({ value: a.name, label: a.name }))

  const changeBirthYear = async (e) => {
    e.preventDefault()
    /* console.log(selectedOption.value, birthYear) */
    const setBornTo = parseInt(birthYear)
    if (!setBornTo) { window.alert('Enter a valid year!'); return null }

    await changeBorn({ variables: { name: selectedOption.value, setBornTo } })
    setBirthYear('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={changeBirthYear}>
        <Select
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={options}
        />  
        <div>
          <input placeholder='BirthYear' type='number' value={birthYear} onChange={({ target }) => setBirthYear(target.value)}/>
        </div>
          <button type='submit'>change</button>
      </form>
    </div>
  )
}

export default Authors