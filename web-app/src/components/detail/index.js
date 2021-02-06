import React, {useState , useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../stories/Button';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import LoadingComponent from '../loading';

const Detail = (props) => {
    const [manga, setManga] = useState({})
    const [isLoaded, setIsLoaded] = useState(false)
    const [error, setError] = useState('')
    const history = useHistory()
    const {t, i18n} = useTranslation()
    const urlBuild = `${process.env.REACT_APP_GET_MANGA_URL}${props.match.params.name}`
    const options = {
        method: 'GET',
        url: urlBuild
      }
      const getManga = () => {
        axios.request(options)
            .then(res=>{
              setIsLoaded(true)
              setManga(res.data.results[0])
            })
            .catch(err=>{
                  setIsLoaded(true)
                  setError(err)
                  console.log(error)
            });
      }
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
    useEffect(()=> {
        getManga();
    },{})
    if(!isLoaded){
        return(
          <LoadingComponent></LoadingComponent>
        )
    }
    return (
        <Container>
             <Row>
                 <Button primary={true} backgroundColor="#00b894" size="small" label={t('detail.back')} onClick={()=>history.push('/home')}></Button>
                 <Button primary={true} backgroundColor="#00b894" size="small" label={t('home.library')} onClick={()=>history.push('/library')}></Button>
            </Row>
            <h1>Manga Detail</h1>
            <h2>{manga.title}</h2>
            <SubContainer>
                <Image src={manga.image_url}></Image>
                <Block>
                    <p>Synopsis : {manga.synopsis} </p>
                    <Button size='medium' label={t('detail.add')} onClick={() => handleLibrary({img: manga.image_url, name:manga.title})}></Button>
                </Block>
            </SubContainer>
        </Container>
    );
};
const Container = styled.div`
display:flex;
flex-direction:column;
`
const Row = styled.div`
width:100%;
padding-top: 15px;
display: flex;
justify-content: space-around;
`
const SubContainer = styled.div`
display:flex;
flex-direction:row;
`
const Image = styled.img`
position:left;
width:15%;
height:20%;
border-radius:12%;
margin-right:20px;
`
const Block = styled.div`
height:20%;
width:80%;
padding:10px;
text-align:left;
`
export default Detail;