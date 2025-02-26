import React, { createContext, useState, useContext } from "react";

// Create the context
const SearchContext = createContext();

// Create a provider component
export const SearchProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <SearchContext.Provider value={{ searchResults, setSearchResults }}>
      {children}
    </SearchContext.Provider>
  );
};

// Custom hook to use the context in any component
export const useSearch = () => useContext(SearchContext);