import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObj => {
  const config = {
    headers: { Authorization: token  }
  }

  const res = await axios.post(baseUrl, newObj, config)
  return res.data
}

const update = async (id, newObj) => {
  const req = await axios.put(`${ baseUrl }/${id}`, newObj)
  return req.data
}

const del = async (id) => {
  const config = {
    headers: { Authorization: token  }
  }

  const req = await axios.delete(`${ baseUrl }/${id}`, config)
  return req.data
}

export default { getAll, create, update, setToken, del }