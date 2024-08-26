import './MemberList.css';
import '../index.css';
import CancelButton from './CancelButton.jsx';
import AccountCircleIcon from '../assets/svg/account-circle.svg?react';

const MemberList = ({ profileImage, name, showCancelButton, onCancel }) => {
  return (
    <div className="member-list-item">
      {/* <img src={profileImage} alt={`${name} profile`} /> */}
      <div className="item-info-container">
        {profileImage !== null ? (
          <img className="profile-image" src={profileImage} />
        ) : (
          <div className="profile-image-wrapper">
            <AccountCircleIcon />
          </div>
        )}
        <div className="item-name">{name}</div>
      </div>
      {showCancelButton && <CancelButton children={'삭제'} onClick={onCancel} />}
    </div>
  );
};

export default MemberList;
