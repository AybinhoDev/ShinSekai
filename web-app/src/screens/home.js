import React, {useState, useEffect} from 'react';
import axios from "axios";
import styled from 'styled-components';

const Home = () => {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [characters, setCharacters] = useState([])
    const options = {
        method: 'GET',
        url: 'https://jikan1.p.rapidapi.com/manga/2/characters',
        headers: {
          'x-rapidapi-key': 'a83f4d13fdmshd09e1cd9d88ac79p1a9957jsn75542e4e3807',
          'x-rapidapi-host': 'jikan1.p.rapidapi.com'
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
    );
};
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