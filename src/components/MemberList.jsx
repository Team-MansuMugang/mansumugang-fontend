import './MemberList.css';
import '../index.css';
import CancelButton from './CancelButton.jsx';

const MemberList = ({ profileImage, name, showCancelButton, onCancel }) => {
  return (
    <div className="member-list-item">
      <div className="item-info-container">
        <img src={profileImage} alt={`${name} profile`} />
        <div className="item-name">{name}</div>
      </div>
      {showCancelButton && <CancelButton children={'삭제'} onClick={onCancel} />}
    </div>
  );
};

export default MemberList;
