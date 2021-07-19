import React, { useState } from "react";

const Search = ({ search }) => {
    const [ searchTerm, setSearchTerm ] = useState('');

    const handleChange = evt => {
        const term = evt.target.value;
        setSearchTerm(term);
        search(term);
    }

return (
    <form className="Search">
        <input 
            type="text" 
            name="search" 
            value={searchTerm} 
            placeholder="Search" 
            onChange={ handleChange }
        /> 
    </form>
)};
export default Search