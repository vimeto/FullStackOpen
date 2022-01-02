import React from 'react'
import {
  useHistory
} from 'react-router-dom'
import { Table } from 'react-bootstrap'

const UserList = ({ users }) => {
  const history = useHistory()

  console.log(users)

  const onClickName = (id) => {
    history.push(`/users/${id}`)
  }

  return (
    <div>
      <h2>Users</h2>
      <Table striped bordered hover>
        <tbody>
          <tr>
            <th>User</th>
            <th>blogs created</th>
          </tr>
          {!users ? null : users.map(user => {
            return (
              <tr key={user.id}>
                <td onClick={() => onClickName(user.id)}>{user.name}</td>
                <td>{user.blogs.length}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </div>
  )
}

export default UserList