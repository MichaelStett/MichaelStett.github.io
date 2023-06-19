import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchPresentation from "../Dumb/SearchPresentation";

const SearchContainer: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = () => {
    if (searchValue.length > 0){
      navigate(`/table/${searchValue}`);
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <SearchPresentation
      searchValue={searchValue}
      onSearchChange={handleSearchChange}
      onSearchClick={handleSearch}
      onKeyDown={handleKeyDown}
    />
  );
}

export default SearchContainer;