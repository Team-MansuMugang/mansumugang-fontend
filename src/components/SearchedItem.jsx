import './SearchedItem.css';
import '../index.css';
import CloseIcon from '../assets/svg/close.svg?react';

const SearchedItem = ({ children, onClick, onDeleteClick }) => {
  return (
    <div className="searched-item" onClick={onClick}>
      <span>{children}</span>
      <button onClick={onDeleteClick}>
        <CloseIcon />
      </button>
    </div>
  );
};

export default SearchedItem;
