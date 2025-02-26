import React, { useState } from 'react'
import './Search.css'
import search_icon from '../Assets/search_icon.png'
import all_product from '../1RenderingAssets/all_product'
import CardProduct from '../ProductCard/CardProduct'
import { useNavigate } from 'react-router-dom'
import { useSearch } from "../../Context/SearchContext"; 

const Search = () => {

  const { setSearchResults } = useSearch(); 

  const navigate = useNavigate();
    
  const [query, setQuery] = useState('');


  function handleSearch() {
    if (query.trim() === '') {
      alert('Please enter a search term');
      return;
    }
    else{
  
      const results = all_product.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results); 
    }
    
  }
  

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission (if inside a form)
      handleSearch();
    }
  }

 
  

  return (
    <div className='search-container'>
        
       <input className='search-input' type="search" placeholder="Search"  value={query} 
        onChange={(e) => setQuery(e.target.value)} onKeyDown={handleKeyDown}/>
       <img className='search-icon' src={search_icon} alt="" onClick={handleSearch}/>

    </div>
  )
}

export default Search