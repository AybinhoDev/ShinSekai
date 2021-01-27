import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import {useHistory } from 'react-router-dom'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import { toggleAuthentication } from '../actions/authentication'
import { motion } from 'framer-motion'
import zorro from '../assets/zorro-cutting.png'
import wanted from '../assets/zorro-wanted2.png'

const Login = () => {
    const [animate, setAnimate] = useState('initial')
    setInterval(()=>{
        setAnimate(animate==='initial' ? 'animated' : 'initial')
    },2000)
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
            setTimeout(()=>{
                history.push('/library')
            },3000)
        })
        .catch(err => {
            setErrorMessage('Error servor, please try again')
            console.log(err)
        })
    }
    return (
        <MainContainer>
            {(isAuthenticationState) ?
            (
            <>
            <Square variants={variantSquare} animate="animated">
                <HalfSquareLeft variants={variantLeft} initial="initial" animate="animated"/>
                <HalfSquareRight variants={variantRight} initial="initial" animate="animated"/>
            </Square>
            <Image src={zorro} alt="Picture of Zorro"></Image>
            </>
            ) : 
            (
            <>
            <Container>
                <StyledForm onSubmit={(e) =>submit(e)}>
                <CustomedDiv>
                <StyledInput type='text' placeholder='Username' onChange={e =>setFormState({...formState, username:e.target.value})}></StyledInput>
                <StyledInput type='password' placeholder='Password' onChange={e =>setFormState({...formState, password:e.target.value})}></StyledInput>
                <StyledInput type='submit'></StyledInput>
                </CustomedDiv>
                </StyledForm>
            </Container>
            <StyledLabelError>{errorMessage}</StyledLabelError>
            </>
            )   
            }
           
        </MainContainer>
    )
}
const MainContainer = styled.div`
margin-top:5%;
vertical-align: middle;
`
const Image = styled.img`
margin-left:40%;
height:295px;
width:170px;
`
const Container = styled.div`
//background-color: #fefefe;
margin-right: auto;
margin-left: auto;
margin-bottom: 50px;
border: 1px solid #888;
width:180px;
height:260px;
box-shadow:0 4px 2px -2px gray;
background-image: url(${wanted});
`
const CustomedDiv = styled.div`
margin-top:177px;
`
const variantSquare = {
    animated: {
        rotate: [0, 0, 270, 270, 0],
        borderRadius: ["20%", "20%", "50%", "50%", "20%"]
    }
}
const Square = styled(motion.div)`
width:180px;
height:260px;
margin-right: auto;
margin-left: auto;
display:flex;
flex-direction:row;
`
const variantLeft = {
    initial: {x: 0},
    animated: {x: -20, transition: {delay: 2}}
}
const HalfSquareLeft = styled(Square)`
background-color:black;
margin:0;
width:50%;
`
const variantRight = {
    initial: {x: 0},
    animated: {x: 20, transition: {delay: 2}}
}
const HalfSquareRight = styled(Square)`
background-color:black;
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
margin-top:100px;
width: auto;
text-align: justify;
font-weight:bold;
color:red;
`
const StyledInput = styled.input`
margin: 6px 0px;
border-radius: 12px;
border: none;
background-color:#00b894;
height:30px;
width:auto;
color:white;
`
export default Login;