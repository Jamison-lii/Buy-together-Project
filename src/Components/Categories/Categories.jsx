import React, { useState } from 'react';
import './Categories.css';
import data_product from '../1RenderingAssets/data';
import Card from '../Cards/Card';
import CardProduct from '../ProductCard/CardProduct';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../../Context/SearchContext'; 

const Categories = () => {
  const [cat, setCat] = useState("Clothes");

  const navigate = useNavigate();

  const { searchResults } = useSearch();

  return (
    <div>
      <div className="categories-container">
        <div className="categories">
          <div onClick={() => setCat("Shoes")} className="varieties1">Shoes</div>
          
          <div onClick={() => setCat("Clothes")} className="varieties">Clothes</div>
          <div onClick={() => setCat("Phones")} className="varieties">Phones</div>
          <div onClick={() => setCat("Accessories")} className="varieties4">Accessories</div>
          <div onClick={() => setCat("Furniture")} className="varieties">Furniture</div>
        </div>
      </div>

      {/* Debugging Logs */}
      {console.log("Selected Category:", cat)}
      {console.log("Filtered Products:", data_product.filter(product => product.category === cat))}

      {/* Display Filtered Products */}

      {searchResults.length > 0 ? (
        searchResults.map(product => (
          <CardProduct key={product.id} image={product.image} name={product.name} new_price={product.new_price} />
        ))
      ) : (
        
       <div className="products-container">
       {data_product
         .filter(product => product.category === cat)
         .map(product => (
           <div key={product.id} onClick={() => navigate(`/product/${product.id}`)}>
           <CardProduct key={product.id} image={product.image} name={product.name} new_price={product.new_price} />
           </div>
         ))
       }
     </div>
      )}



    </div>
  );
};

export default Categories;
