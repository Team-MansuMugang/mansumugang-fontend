import './SearchedItem.css';
import '../index.css';
import CloseIcon from '../assets/svg/close.svg?react';

const SearchedItem = ({ children }) => {
  return (
    <div className="searched-item">
      <span>{children}</span>
      <button>
        <CloseIcon />
      </button>
    </div>
  );
};

export default SearchedItem;
