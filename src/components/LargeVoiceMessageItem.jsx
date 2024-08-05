import './LargeVoiceMessageItem.css';
import '../index.css';
import ChevronRightIcon from '../assets/svg/chevron-right.svg?react';

const LargeVoiceMessageItem = ({ profileImage, name, date, time, onClick }) => {
  return (
    <div className="large-voice-message-item" onClick={onClick}>
      <div className="item-info-container">
        <img src={profileImage} alt={`${name} profile`} />

        <div className="item-details">
          <div className="item-name">{name}</div>
          <div className="item-date-time">{`${date} · ${time}`}</div>
        </div>
      </div>

      <ChevronRightIcon className="item-icon" />
    </div>
  );
};

export default LargeVoiceMessageItem;
