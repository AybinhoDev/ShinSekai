import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {useHistory } from 'react-router-dom'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import { toggleAuthentication } from '../actions/authentication'
import { motion } from 'framer-motion'

const Login = () => {
    const [formState,setFormState] = useState({username:'',password:''})
    const [errorMessage,setErrorMessage]=useState('')
    const history = useHistory()
    const dispatch = useDispatch()
    const isAuthenticationState = useSelector(state => state.toggleAuthentication.isAuthenticatedValue)
    const submit = e => {
        e.preventDefault()
        if(!formState.username || !formState.password){
            setErrorMessage('Fields username and password need to be filled')
            return
        }
        axios( {
            method:'POST',
            url:process.env.REACT_APP_LOGIN_URL,
            data: {
                username:formState.username,
                password:formState.password
            }
        })
        .then(res => {
            localStorage.setItem('token',res.headers['x-access-token'])
            console.log('connexion ok')
            console.log('IsAuthenticatedState =', isAuthenticationState)
            dispatch(toggleAuthentication())
            history.push('/library')
        })
        .catch(err => {
            setErrorMessage('Error servor, please try again')
            console.log(err)
        })
    }
    return (
        <MainContainer>
           <Container>
                <StyledForm onSubmit={(e) =>submit(e)}>
                <StyledTitle>The ShinSekaï</StyledTitle>
                <StyledInput type='text' placeholder='Username' onChange={e =>setFormState({...formState, username:e.target.value})}></StyledInput>
                <StyledInput type='password' placeholder='Password' onChange={e =>setFormState({...formState, password:e.target.value})}></StyledInput>
                <StyledLabelError>{errorMessage}</StyledLabelError>
                <StyledInput type='submit'></StyledInput>
                </StyledForm>
            </Container>
        </MainContainer>
    )
}
const MainContainer = styled.div`
margin-top:15%;
vertical-align: middle;
`
const Container = styled.div`
background-color: #fefefe;
padding-right: 15px;
padding-left: 15px;
margin-right: auto;
margin-left: auto;
border: 1px solid #888;
border-radius: 8%;
box-shadow:0 4px 2px -2px gray;
width: 20%;
`
const Square = styled(motion.div)`
width:20%;
height:215px;
margin-right: auto;
margin-left: auto;
background-color:black;
display:flex;
flex-direction:row;
`
const HalfSquareLeft = styled(Square)`
border-top-left-radius: 8%;
border-bottom-left-radius: 8%;
background-color:green;
margin:0;
width:50%;
`
const variantSpace = {
    initial: {x: 0, transition: { duration: 1}}
}
const CutSpace = styled(motion.div)`
width:0px;
background-color:white;

`
const HalfSquareRight = styled(Square)`
border-top-right-radius: 8%;
border-bottom-right-radius: 8%;
background-color:green;
margin:0;
width:50%;
`
const StyledForm = styled.form`
display:flex;
flex-direction: column;
align-items: center;
justify-content:center;
`
const StyledTitle = styled.label`
margin-bottom:50px;
width: auto;
font-size: 25px;
text-align: center;
font-weight:bold;
`
const StyledLabelError = styled.label`
width: auto;
text-align: justify;
font-weight:bold;
color:red;
`
const StyledInput = styled.input`
margin: 6px 0px;
border-radius: 12px;
border: none;
background-color:#1eaf7a;
height:30px;
width:auto;
color:white;
`
export default Login;