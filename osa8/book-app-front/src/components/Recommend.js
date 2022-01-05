import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'

import { ME, ALL_BOOKS_FILTER_GENRE } from '../queries/index'

const Recommend = (props) => {
  const resultMe = useQuery(ME)
  const [getBooks, resultBooks] = useLazyQuery(ALL_BOOKS_FILTER_GENRE)
  const [favoriteGenre, setFavoriteGenre] = useState(null)
  const [books, setBooks] = useState(null)

  useEffect(() => {
    if (resultMe.data && resultMe.data.me) {
      console.log(resultMe.data)
      const favGenre = resultMe.data.me.favoriteGenre
      setFavoriteGenre(favGenre)
      getBooks({ variables: { genre: favGenre } })
    }
  }, [resultMe.data]) //eslint-disable-line

  useEffect(() => {
    if (resultBooks.data) {
      setBooks(resultBooks.data.allBooks.map(book => ({ ...book, author: book.author.name })))
    }
  }, [resultBooks.data])

  if (!props.show) {
    return null
  }


  return (
    <div>
      <h2>recommendations</h2>
      <p>Books in your favorite category <b>{favoriteGenre}</b></p>
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
    </div>
  )
}

export default Recommend