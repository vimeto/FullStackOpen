import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import LogInAndInfo from './logInAndInfo'

const NavDiv = styled.div`
  width: 100%;
  height: fit-content;
  background-color: white;
  border-bottom: 1px solid black;
  padding: 10px 0;
  margin-bottom: 20px;
`

const LinkStyle = styled.p`
  padding: 0;
  margin: 10px 30px;
  font-size: 1.2rem;
  display: inline;
`

const Navigation = () => {

  const inlineStyle = {
    display: 'inline-block'
  }

  return (
    <NavDiv>
      <Link to='/'>
        <LinkStyle>Blogs</LinkStyle>
      </Link>
      <Link to='/users'>
        <LinkStyle>Users</LinkStyle>
      </Link>
      <div style={inlineStyle}>
        <LogInAndInfo />
      </div>
    </NavDiv>
  )
}

export default Navigation