import './LargeVoiceMessageItem.css';
import '../index.css';
import ChevronRightIcon from '../assets/svg/chevron-right.svg?react';
import { parseLocalDateTime } from '../utility/dates';
import AccountCircleIcon from '../assets/svg/account-circle.svg?react';

const LargeVoiceMessageItem = ({ profileImage, name, dateTime, onClick }) => {
  const { formattedDate, formattedTime } = parseLocalDateTime(dateTime);

  return (
    <div className="large-voice-message-item" onClick={onClick}>
      <div className="item-info-container">
        {profileImage ? (
          <img className="profile-image" src={profileImage} />
        ) : (
          <div className="profile-image-wrapper">
            <AccountCircleIcon />
          </div>
        )}
        <div className="item-details">
          <div className="item-name">{name}</div>
          <div className="item-date-time">{`${formattedDate} · ${formattedTime}`}</div>
        </div>
      </div>

      <ChevronRightIcon className="item-icon" />
    </div>
  );
};

export default LargeVoiceMessageItem;
