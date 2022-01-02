import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Switch, Route, useRouteMatch
} from 'react-router-dom'

import BlogForm from './components/forms/blogForm'
import InfoMessage from './components/utils/infoMessage'
import BlogList from './components/blogList'
import UserList from './components/userList'
import SingleUser from './components/singleUser'
import SingleBlog from './components/singleBlog'
import Navigation from './components/navigation'

import blogService from './services/blogs'
import userService from './services/users'

import { initializeBlogs } from './reducers/blogReducer'
import { setUserActionCreator } from './reducers/userReducer'


const App = () => {
  const dispatch = useDispatch()
  const [users, setUsers] = useState(null)
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch(setUserActionCreator(user))
    }
  }, [])
  useEffect(() => {
    userService.getAll().then((u) => setUsers(u))
  }, [])

  const match = useRouteMatch('/users/:id')
  const singleUser = match && users ? users.find(u => u.id === match.params.id) : null

  return (
    <div className='container'>
      <Navigation />
      <InfoMessage />
      <h1>BLOG APP</h1>
      <Switch>
        <Route path='/users/:id'>
          <SingleUser user={singleUser}/>
        </Route>
        <Route path='/users'>
          <UserList users={users}/>
        </Route>
        <Route path='/blogs/:id'>
          <SingleBlog blogs={blogs}/>
        </Route>
        <Route path='/'>
          <BlogForm />
          <BlogList />
        </Route>
      </Switch>
    </div>
  )
}

export default App