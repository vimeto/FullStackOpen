import { gql } from "@apollo/client"

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    published
    author {
      name
      born
      id
    }
    id
    genres
  }
`

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    bookCount
    id
  }
}
`

export const ALL_BOOKS = gql`
query {
  allBooks {
    title
    published
    id
    genres
    author {
      name
    }
  }
}
`

export const ALL_BOOKS_FILTER_GENRE = gql`
query findAllBooksWithGenre($genre: String) {
  allBooks(genre: $genre) {
    title
    published
    id
    genres
    author {
      name
    }
  }
}
`

export const CREATE_BOOK = gql`
mutation createBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
  addBook(
    title: $title,
    published: $published,
    author: $author,
    genres: $genres
  ) {
    title
  }
}
`

export const CHANGE_BORN = gql`
mutation changeBorn($name: String!, $setBornTo: Int!) {
  editAuthor(
    name: $name,
    setBornTo: $setBornTo
    ) {
    name
  }
}
`

export const LOGIN = gql`
  mutation loginUser($username: String!, $password: String!) {
    login(
      username: $username,
      password: $password
    ) {
      value
    }
  }
`

export const ME = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }

${BOOK_DETAILS}
`