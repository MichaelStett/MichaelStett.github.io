import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSearchClick = () => {
    navigate('/table', { state: { searchValue: searchValue } });
  };

  return (
    <div>
      <input type="text" value={searchValue} onChange={handleSearchChange} />
      <button onClick={handleSearchClick}>Search</button>
    </div>
  );
}

export default Search;
