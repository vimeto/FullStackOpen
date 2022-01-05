import React, { useState, useEffect } from 'react'
import { ALL_BOOKS, ALL_BOOKS_FILTER_GENRE } from '../queries'
import { useLazyQuery, useQuery } from '@apollo/client'
import { isEnumType } from 'graphql'

const Books = (props) => {
  const response = useQuery(ALL_BOOKS)
  const [getBooks, responseBooks] = useLazyQuery(ALL_BOOKS_FILTER_GENRE)
  const [books, setBooks] = useState(null)
  const [genres, setGenres] = useState(null)
  const [activeGenre, setActiveGenre] = useState(null)


  useEffect(() => {
    if (response.data) {
      const allBooks = response.data.allBooks.map((item) => ({ ...item, author: item.author.name }))
      setBooks(allBooks)
      setGenres(Array.from(new Set(allBooks.map((item) => item.genres).flat(1))))
    }
  }, [response.data]) //eslint-disable-line

  useEffect(() => {
    if (responseBooks.data) {
      setBooks(responseBooks.data.allBooks.map(item => ({ ...item, author: item.author.name })))
    }
  }, [responseBooks.data])

  const handleClick = (genre) => {
    getBooks({ variables: { genre } })
    setActiveGenre(genre)
  }

  if (!props.show) {
    return null
  }
  if (response.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>books</h2>
      <p>In genre <b>{activeGenre === null ? 'all' : activeGenre}</b></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      { genres.map((genre, index) => (
        <button key={index} onClick={() => handleClick(genre)}>{genre}</button>
      )) }
      <button onClick={() => handleClick(null)}>all</button>
    </div>
  )
}

export default Books