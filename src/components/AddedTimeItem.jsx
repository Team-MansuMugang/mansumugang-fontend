import './AddedTimeItem.css';
import '../index.css';
import CloseIcon from '../assets/svg/close.svg?react';

const AddedTimeItem = ({ meridiem = '오전', hour = '1', minutes = '1' }) => {
  return (
    <div className="added-time-item">
      <span>{`${meridiem} ${hour}시 ${minutes}분`}</span>
      <button>
        <CloseIcon />
      </button>
    </div>
  );
};

export default AddedTimeItem;
