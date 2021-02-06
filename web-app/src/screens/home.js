import React, {useState, useEffect} from 'react';
import axios from "axios";
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import LoadingComponent from '../components/loading';
import ErrorNotFound from '../components/error';
import { motion } from 'framer-motion';

const Home = () => {
    const isLogged = useSelector(state => state.toggleAuthentication.isAuthenticatedValue)
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [mangas, setMangas] = useState([])
    const history = useHistory()
    const { t, i18n } = useTranslation()
    const options = {
        method: 'GET',
        url: process.env.REACT_APP_GET_MANGAS_URL
      }
    const getMangas = () => {
      axios.request(options)
          .then(res=>{
            setIsLoaded(true)
            setMangas(res.data.top)
          })
          .catch(err=>{
                setIsLoaded(true)
                setError(err)
                console.log(error)
          });
    }
    useEffect(()=> {
      getMangas();
    },[])
    if(!isLoaded){
      return(
        <LoadingComponent></LoadingComponent>
      )
    }
    return (
        <div>
              {mangas[0] ?
                <>
                <h1>{t('home.popular')}</h1>
                <StyledParent>
                {mangas.map(topM => (
                    <StyledChild>
                    <LibraryLink>
                    <StyledImage variants={variantImg} whileHover="whileHover" whileTap="whileTap"
                    onClick={() => history.push(`/detail/${topM.title}`)} src={topM.image_url}></StyledImage><br/>
                    <StyledText>{topM.title}</StyledText> 
                    </LibraryLink>
                </StyledChild>
                ))}
                </StyledParent>
                </>
              :
              <>
              <ErrorNotFound></ErrorNotFound>
              <button onClick={getMangas()}>Retry</button>
              </>
              }
        </div>
    )
}
const Container = styled.div`
display:flex;
flex-direction:row;
justify-content:flex-end;
width:100%;
`
const RedirectButtton = styled.button`
`
const variantImg = {
  whileHover: { scale: 1.1 },
  whileTap:{ scale: 0.9 }
}

const StyledImage = styled(motion.img)`
height:230px;
width:180px;
border-radius:25%;
box-shadow:0 4px 2px -2px gray;
`
const StyledParent = styled.div`
display: flex;
flex-wrap: wrap;
margin-top: -10px;
margin-left: -10px;
`

const StyledChild = styled.div`
  width: calc(25% - 10px);
  margin-left: 5px;
  margin-top: 5px;
  height: 300px;
`

const StyledText = styled.span`
text-align:center;
font-weight:bold;
color:black;
`
export const LibraryLink = styled.a`
  color: #fff;
  text-align: center;
`;
export default Home;