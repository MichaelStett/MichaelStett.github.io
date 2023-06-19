import React from "react";

interface SearchPresentationProps {
  searchValue: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const SearchPresentation: React.FC<SearchPresentationProps> = ({
  searchValue,
  onSearchChange,
  onSearchClick,
  onKeyDown,
}) => (
  <div>
    <input 
      type="text" 
      value={searchValue} 
      onChange={onSearchChange}
      onKeyDown={onKeyDown}
      className="px-4 py-2 border rounded-lg mr-2 w-60" 
      placeholder="Find the books!"
    />
    <button 
      onClick={onSearchClick} 
      className="px-4 py-2 bg-gradient-to-r from-[#FFB703] to-[#FB8500] text-white rounded-lg">
      Search
    </button>
  </div>
);

export default SearchPresentation;
