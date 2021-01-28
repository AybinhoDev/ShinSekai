import React from 'react'
import { Link } from 'react-router-dom'


const Library = () => {
    return (
        <div>
            <Link to='/search'>Manga</Link>
            <h1>Library Page</h1>
        </div>
    );
};

export default Library