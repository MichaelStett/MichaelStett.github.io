import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const onKeyDown = (e : React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'Enter' ) {
        console.log(searchValue);
    }
  }

  const handleSearchClick = (e : React.MouseEvent<HTMLButtonElement>) => {
    console.log(searchValue);
  }

  return (
    <div>
      <input type="text" value={searchValue} onChange={handleSearchChange} onKeyDown={onKeyDown} />
      <button onClick={handleSearchClick}>Search</button>
    </div>
  );
}

export default Search;
