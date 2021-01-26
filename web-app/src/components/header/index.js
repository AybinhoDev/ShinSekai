import React from 'react'
import styled from 'styled-components'

const Header = () => {

  

  return (
    <Container>
         <StyledSpan>Shinsekai</StyledSpan>
       
      {/* {isToken ? (
        
        <StyledSpan>se déconnecter</StyledSpan>
        
      ) : (
        null
      )} */}
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