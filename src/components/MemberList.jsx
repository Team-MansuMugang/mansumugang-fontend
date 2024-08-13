import './MemberList.css';
import '../index.css';
import CancelButton from './CancelButton.jsx';

const MemberList = ({ profileImage, name, showCancelButton, onCancel }) => {
  return (
    <div className="member-list-item">
      <div className="item-info-container">
        <img src={profileImage} alt={`${name} profile`} />
        <div className="item-details">
          <div className="item-name">{name}</div>
        </div>
      </div>
      {showCancelButton && <CancelButton onClick={onCancel} />}
    </div>
  );
};

export default MemberList;
