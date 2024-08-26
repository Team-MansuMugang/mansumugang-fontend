import './SmallVoiceMessageItem.css';
import '../index.css';
import { timeAgoByStr } from '../utility/dates';
import AccountCircleIcon from '../assets/svg/account-circle.svg?react';

const SmallVoiceMessageItem = ({ profileImage, name, time, onClick }) => {
  return (
    <div className="small-voice-message-item" onClick={onClick}>
      {profileImage ? (
        <img className="profile-image" src={profileImage} />
      ) : (
        <div className="profile-image-wrapper">
          <AccountCircleIcon />
        </div>
      )}
      <div className="item-name">{name}</div>
      <div className="item-time">{timeAgoByStr(time)}</div>
    </div>
  );
};

export default SmallVoiceMessageItem;
