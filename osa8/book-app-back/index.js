const { ApolloServer, gql, UserInputError, AuthenticationError, PubSub } = require('apollo-server')
const pubsub = new PubSub()
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const config = require('./config')
const MONGODB_URI = config.MONGODB_URI
const JWT_SECRET = config.JWT_SECRET

console.log('connecting to MONDODB')
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((err) => {
    console.log('error connecting to MongoDB', err.message)
  })

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    id: ID!
    books: [Book!]!
    bookCount: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(genre: String, author: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  },
  type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.genre && !args.author) {
        return await Book.find({})
      }
      else if (!args.author) {
        return await Book.find({ genres: args.genre })
      }
      const authorID = await Author.findOne({ name: args.author })
      if (authorID === null) {
        throw new UserInputError("No such author", {
          invalidArgs: args,
        })
      }
      if (!args.genre) {
        return await Book.find({ author: authorID })
      }
      return await Book.find({ genres: args.genre, author: authorID })
    },
    allAuthors: async () => {
      return await Author.find({})
    },
    me: (root, args, { currentUser }) => currentUser
  },
  Author: {
    bookCount: async (root) => {
      return root.books.length
    },
  },
  Book: {
    author: async (root) => {
      return await Author.findById(root.author)
    }
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      const authorName = args.author
      const authorExists = await Author.exists({ name: authorName })
      if (authorExists) {
        try {
          const author = await Author.findOne({ name: authorName })
          const book = new Book({ ...args, author: author.id })
          author.books = author.books.concat(book.id)
          pubsub.publish('BOOK_ADDED', { bookAdded: book })
          await author.save()
          return await book.save()
        }
        catch(err) {
          throw new UserInputError(err.message, {
            invalidArgs: args
          })
        }
      }
      else {
        try {
          const author = new Author({ name: authorName })
          const book = new Book({ ...args, author: author.id })
          author.books = author.books.concat(book.id)
          pubsub.publish('BOOK_ADDED', { bookAdded: book })
          await author.save()
          return book.save()
        }
        catch(err) {
          throw new UserInputError(err.message, {
            invalidArgs: args
          })
        }
      }
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      const author = await Author.findOne({ name: args.name })
      if (!author) { return null }
      author.born = args.setBornTo
      return await author.save()
    },
    createUser: (root, args) => {
      const user =  new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre
      })
      console.log(user)

      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if ( !user || args.password !== 'salainen' ) {
        throw new UserInputError("Wrong credentials")
      }
      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})