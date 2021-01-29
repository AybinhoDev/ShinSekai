import React, {useState, useEffect} from 'react';
import axios from "axios";
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import library from './library';


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
      
      useEffect(()=> {
          axios.request(options)
          .then(res=>{
              setIsLoaded(true)
              setMangas(res.data.top)
          })
          .catch(err=>{
                setIsLoaded(true)
                setError(err)
          });

      },[])

      const handleLibrary = library =>{
        console.log("handleLibrary -> library",library)
        const currentLibrary = localStorage.getItem('library') 
          ? JSON.parse(localStorage.getItem('library'))
          :[]

        const isPresent = currentLibrary?.map(e => e.name).indexOf(library.name)
        console.log('isPresent',isPresent)
        
        console.log(isPresent)

        if(isPresent === -1){
            currentLibrary.push(library)
            localStorage.setItem('library',JSON.stringify(currentLibrary))

            return
        }else{
            const filteredCharacters=currentLibrary.filter(
                character => character.name !== library.name
            )
            console.log('filteredCharacters',filteredCharacters)
            localStorage.setItem('library',JSON.stringify(filteredCharacters))
        }
      }


    return (
        <div>
            <Container>
                {isLogged ? (<RedirectButtton onClick={()=>history.push('/library')}>{t('home.library')}</RedirectButtton>) : null }
            </Container>
            <h1>{t('home.popular')}</h1>
            <StyledParent>
            {mangas?.map(topM => (
                <StyledChild>
                <LibraryLink to={`/details/${topM?.title}`}>
                <StyledImage src={topM?.image_url}></StyledImage><br/>
                <StyledText>{topM?.title}</StyledText> 
                </LibraryLink>
                <button onClick={() => handleLibrary({img: topM?.image_url, name:topM?.title})}>Like</button>
            </StyledChild>
            ))}
            </StyledParent>
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
const StyledImage = styled.img`
height:230px;
width:180px;
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