import React, {useState, useEffect} from 'react'

import axios from 'axios'

const Search = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  useEffect(() => {
      const generatedUrl ='https://api.jikan.moe/v3/search/manga'
      const timestamp = new Date().getMilliseconds()
      axios({
          method:'GET',
          url: generatedUrl,
          params: {
            ts: timestamp,
              q: query
          }
      })
      .then(res=> {
          console.log('Search ->res',res)
          setResults(res.data.results)
      })
      .catch(err => {
          console.log(err)
      })
  }, [query])

    return (
        <div>
            <p>search</p>
            <input type="text" onChange={e => setQuery(e.target.value)}/>
            {results?.map(res => (
                <p key={res?.id}>{res?.name}</p>
            ))}
        </div>
    );
};


export default Search;
