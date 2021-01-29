import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'


const Library = () => {
    const currentLibrary = localStorage.getItem('library') 
    ? JSON.parse(localStorage.getItem('library'))
    :[]
    const [lib,setLibrarys] = useState(currentLibrary)
    useEffect(() => {
        console.log('Library -> Lib', lib)
    },[lib])



    const deleteLibrary = title => {
        const newLibrarys = lib.filter(tibrary => tibrary.name !== title)
        setLibrarys(newLibrarys)
      }
    
    return (
        <div>
            <Link to='/search'>Manga</Link>
            <h1>Library Page</h1>
            
            {lib.map(topM => (      

            <div key={topM.name}>
                <p>
                {topM.name}
                </p>
                <img src={topM.img}></img>
                

                <button onClick={() => deleteLibrary(topM.name)}>supprimer</button>
            </div>
            ))}
        </div>
    );
};


export default Library

export const LibraryContainer = styled.div`
  background: black;
  color: #fff;
  padding: 1rem 0rem;
`;

export const LibraryWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-rigth:10%;
  margin-left:10%;
`;

export const LibraryCard = styled.div`
  width: 400px;
  display: flex;
  flex-direction: row;
  margin:1rem
`;

export const LibraryImg = styled.img`
  height: 125px;
  min-width: 125px;
  margin-top:10%;
  max-width: 100%;
  box-shadow: 8px 8px #db80ff;
`;

export const LibraryHeading = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  padding: 1rem;
  color:#db80ff;
  text-transform:uppercase;
  border-top:2px #fff;
`;

export const LibraryTitle = styled.h2`
  font-size: 1.5rem;
  margin:10px;
`;

export const LibraryButton = styled.button`
color:white;
background: linear-gradient(-75deg,#db80ff,#ca45ff,#716fff,#43baff,#43f2ff);
width: 200px;
height: 40px;
font-size: 20px;
border-radius: 20px;
border: none;
`;

export const LibraryLink = styled.a`
  color: #fff;
  font-size: 20px;
  text-align: center;
`;
