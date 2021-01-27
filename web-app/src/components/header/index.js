import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { toggleAuthentication } from '../../actions/authentication'

const Header = () => {
  const dispatch = useDispatch()
  const isLogged = useSelector(state => state.toggleAuthentication.isAuthenticatedValue)
  const handleClick = () => {
    dispatch(toggleAuthentication())
  }
  return (
    <Container>
         <StyledSpan>Shinsekai</StyledSpan>
       
      {isLogged ? (
        
        <StyledSpan onClick={handleClick}>Logout</StyledSpan>
        
      ) : (
        null
      )}
    </Container>
  )
}

const Container = styled.div`
  background-color: #00b894;
  display: flex;
  justify-content: space-between;
  height: 60px;
`

const StyledSpan = styled.span `
    color: black;
    display: inline-flex;
    align-items: center;
    letter-spacing: 0.2rem;
    font-weight: bold;
`

export default Header