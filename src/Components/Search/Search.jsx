import React, { useState } from 'react'
import './Search.css'
import search_icon from '../Assets/search_icon.png'

const Search = (prop) => {
    
  const [query, setQuery] = useState('');
  

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission (if inside a form)
      handleSearch();
    }
  }

  function handleSearch(){
    if (query.trim() === '') return;
    alert('Search Functionality Coming Soon!')
    // Add your search functionality here, for example, using fetch API to fetch data from an API or a backend server. 
    
    // Example: fetch('https://api.example.com/products?search=' + encodeURIComponent(event.target.value))
    //.then(response => response.json())
    //.then(data => console.log(data))
   .catch(error => console.error('Error:', error))
  }

  return (
    <div className='search-container'>
        
       <input className='search-input' type="search" placeholder={prop.placeholder}  value={query} 
        onChange={(e) => setQuery(e.target.value)} onKeyDown={handleKeyDown}/>
       <img className='search-icon' src={search_icon} alt="" onClick={handleSearch}/>

    </div>
  )
}

export default Search