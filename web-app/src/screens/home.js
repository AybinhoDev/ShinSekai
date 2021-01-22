import React, {useState, useEffect} from 'react';
import axios from "axios";
import styled from 'styled-components';

const Home = () => {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [characters, setCharacters] = useState([])
    const options = {
        method: 'GET',
        url: process.env.REACT_APP_GET_CHARACTERS_URL,
        headers: {
          'x-rapidapi-key': process.env.REACT_APP_API_KEY,
          'x-rapidapi-host': process.env.REACT_APP_HOST_API
        }
      }
      
      useEffect(()=> {
          axios.request(options)
          .then(res=>{
              setIsLoaded(true)
              setCharacters(res.data.characters)
          })
          .catch(err=>{
                setIsLoaded(true)
                setError(err)
          });

      })
    return (
        <div>
            <h1>Personnages</h1>
            {characters.map(perso => (
            <div>
                <StyledImage src={perso?.image_url}></StyledImage><br/>
                <StyledText>{perso?.name}</StyledText>
            </div>
            ))}
        </div>
    )
}
const StyledImage = styled.img`
height:200px;
width:150px;
`
const StyledText = styled.span`
text-align:center;
font-weight:bold;
color:green;
`
export default Home;