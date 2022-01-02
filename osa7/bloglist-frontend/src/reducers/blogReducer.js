import blogService from '../services/blogs'
import { notificationChange } from './notificationReducer'

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'ADD_BLOG':
    return state.concat(action.data)
  case 'INITIALIZE_BLOGS':
    return action.data
  case 'UPDATE_BLOG': {
    return state.map(b => b.id === action.blog.id ? action.blog : b)
  }
  case 'DELETE_BLOG': {
    const id = action.blog.id
    return state.filter(b => b.id !== id)
  }
  default:
    return state
  }
}

export const addNewBlog = (data) => {
  return async dispatch => {
    await dispatch({
      type: 'ADD_BLOG',
      data
    })
  }
}
export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    await dispatch({
      type: 'INITIALIZE_BLOGS',
      data: blogs
    })
  }
}
export const likeBlogActionCreator = (blog) => {
  return async dispatch => {
    const newBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    await blogService.update(blog.id, newBlog)
    await dispatch({
      type: 'UPDATE_BLOG',
      blog: newBlog
    })
  }
}
export const addCommentActionCreator = (blog, newComment) => {
  return async dispatch => {
    const newObj = await blogService.addComment(blog.id, newComment)
    await dispatch({
      type: 'UPDATE_BLOG',
      blog: newObj
    })
  }
}
export const deleteBlogActionCreator = (blog) => {
  return async dispatch => {
    try {
      await blogService.del(blog.id)
      await dispatch({
        type: 'DELETE_BLOG',
        blog
      })
      dispatch(notificationChange({
        text: `Post '${blog.title}' deleted`,
        color: 'green'
      }))
    }
    catch (err) {
      if (err.response.status === 401) {
        console.log('You cannot delete other users posts')
        dispatch(notificationChange({
          text: 'You cannot delete other users posts',
          color: 'red'
        }))
      }
      else {
        console.log('This post has been deleted elsewhere, try to refresh.')
        dispatch(notificationChange({
          text: 'This post has been deleted elsewhere, try to refresh.',
          color: 'red'
        }))
      }
    }
  }
}

export default blogReducer