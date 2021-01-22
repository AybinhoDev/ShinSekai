import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleAuthentication } from '../actions/authentication'
import Button from '../stories/Button'

const Library = () => {
    const dispatch = useDispatch()
    const isAuthenticationState = useSelector(state => state.toggleAuthentication.isAuthenticatedValue)
    console.log('IsAuthenticatedState =', isAuthenticationState)
    return (
        <div>
            <h1>Library Page</h1>
            <Button primary={true} backgroundColor='#1eaf7a' size='large' label='déconnexion' 
            onClick={()=>{
                localStorage.removeItem('token')
                dispatch(toggleAuthentication())
                console.log('IsAuthenticatedState =',isAuthenticationState)
            }}
            ></Button>
        </div>
    );
};

export default Library