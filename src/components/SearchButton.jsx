import SearchingIcon from '../assets/svg/search.svg?react';
import './SearchButton.css';
import '../index.css';

const SearchButton = ({ disabled = false, onclick }) => {
  return (
    <button className="search-button" disabled={disabled} onClick={onclick}>
      <SearchingIcon></SearchingIcon>
    </button>
  );
};

export default SearchButton;
