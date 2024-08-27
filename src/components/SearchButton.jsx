import SearchingIcon from '../assets/svg/search.svg?react';
import './SearchButton.css';
import '../index.css';

const SearchButton = ({ disabled = false, onClick }) => {
  return (
    <button className="search-button" disabled={disabled} onClick={onClick}>
      <SearchingIcon></SearchingIcon>
    </button>
  );
};

export default SearchButton;
