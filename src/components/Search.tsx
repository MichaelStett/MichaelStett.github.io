import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const Search: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSearchClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (searchValue.length > 0){
      navigate(`/table/${searchValue}`);
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(event)
    if (event.key === 'Enter') {
      if (searchValue.length > 0){
        navigate(`/table/${searchValue}`);
      }
    }
  };

  return (
    <div>
      <input type="text" value={searchValue} onChange={handleSearchChange}
        className="px-4 py-2 border rounded-lg mr-2 w-60" 
        onKeyDown={handleKeyDown}
        placeholder="Find the books!"/>
      <button onClick={handleSearchClick} className="px-4 py-2 bg-gradient-to-r from-[#FFB703] to-[#FB8500]  text-white rounded-lg">Search</button>
    </div>
  );
}

export default Search;
