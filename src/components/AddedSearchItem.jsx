import './AddedSearchItem.css';
import '../index.css';
import CloseIcon from '../assets/svg/close.svg?react';

const AddedSearchItem = ({ search }) => {
  return (
    <div className="added-search-item">
      <span>{search}</span>
      <button>
        <CloseIcon />
      </button>
    </div>
  );
};

export default AddedSearchItem;
