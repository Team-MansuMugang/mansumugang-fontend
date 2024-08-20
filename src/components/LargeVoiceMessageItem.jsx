import './LargeVoiceMessageItem.css';
import '../index.css';
import ChevronRightIcon from '../assets/svg/chevron-right.svg?react';
import { parseLocalDateTime } from '../utility/dates';

const LargeVoiceMessageItem = ({ profileImage, name, dateTime, onClick }) => {
  const { formattedDate, formattedTime } = parseLocalDateTime(dateTime);

  return (
    <div className="large-voice-message-item" onClick={onClick}>
      <div className="item-info-container">
        <img src={profileImage} alt={`${name} profile`} />

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
