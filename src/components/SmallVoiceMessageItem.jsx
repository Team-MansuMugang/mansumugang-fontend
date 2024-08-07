import './SmallVoiceMessageItem.css';
import '../index.css';

const SmallVoiceMessageItem = ({ profileImage, name, time, onClick }) => {
  return (
    <div className="small-voice-message-item" onClick={onClick}>
      <img src={profileImage} alt={`${name} profile`} />
      <div className="item-name">{name}</div>
      <div className="item-time">{time}</div>
    </div>
  );
};

export default SmallVoiceMessageItem;
