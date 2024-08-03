import './VoiceMessageList.css';
import '../index.css';

const VoiceMessageList = ({ profileImage, name, responseTime, onDetailsClick, date }) => {
  return (
    <div className="VoiceMessageList-container">
      <img src={profileImage} alt={`${name} profile`} className="VoiceMessageList-image" />
      <div className="VoiceMessageList-details">
        <div className="VoiceMessageList-name">{name}</div>
        <div className="view-date">
          {date}
          <div className="VoiceMessageList-time">{responseTime + '분전'}</div>
        </div>
      </div>
      <button className="VoiceMessageList-button" onClick={onDetailsClick}>
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
          <path fill="currentColor" d="M12.6 12L8 7.4L9.4 6l6 6l-6 6L8 16.6z" />
        </svg>
      </button>
    </div>
  );
};

export default VoiceMessageList;
