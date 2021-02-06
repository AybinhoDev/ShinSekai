import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { toggleAuthentication } from '../../actions/authentication'
import { useTranslation } from 'react-i18next'
import france from '../../assets/france.png'
import uk from '../../assets/united-kingdom.png'
import { useHistory } from 'react-router-dom'

const Header = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const isLogged = useSelector(state => state.toggleAuthentication.isAuthenticatedValue)
  const { t, i18n } = useTranslation()
  const handleClick = () => {
    dispatch(toggleAuthentication())
  }
  const changeLanguage = lng => {
    i18n.changeLanguage(lng)
  }
  return (
    <Container>
      <StyledDiv>
        <StyledSpan onClick={()=>history.push('/home')}>Shinsekai</StyledSpan>
      </StyledDiv>
        <StyledDiv>
          <Flag src={france} onClick={() => changeLanguage('fr')}></Flag>
          <Flag src={uk} onClick={() => changeLanguage('en')}></Flag>
        {isLogged ? (
          <StyledSpan onClick={handleClick}>{t('logout')}</StyledSpan>
          ) : (
            <StyledSpan onClick={()=>history.push('/')}>{t('login.signin')}</StyledSpan>
            )}
        </StyledDiv>
    </Container>
  )
}

const Container = styled.div`
  background-color: #00b894;
  display: flex;
  justify-content: space-between;
  height: 60px;
`
const Flag = styled.img`
height:30px;
width:40px;
margin-left:5px;
margin-right:5px;
`
const StyledSpan = styled.span `
color: black;
letter-spacing: 0.2rem;
font-weight: bold;
`
const StyledDiv = styled.div `
margin: 0 2%;
display: inline-flex;
align-items:center;
`
export default Header