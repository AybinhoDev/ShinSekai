import React, {useState, useEffect} from 'react';
import axios from "axios";
import styled from 'styled-components';

const Home = () => {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [mangas, setMangas] = useState([])
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
    return (
        <div>
            <h1>Mangas les plus populaires</h1>
            <StyledParent>
            {mangas?.map(topM => (
                <StyledChild>
                    <StyledImage src={topM?.image_url}></StyledImage><br/>
                    <StyledText>{topM?.title}</StyledText>
                </StyledChild>
            ))}
            </StyledParent>
        </div>
    )
}
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
export default Home;