import './SmallVoiceMessageItem.css';
import '../index.css';
import { timeAgo } from '../utility/dates';

const SmallVoiceMessageItem = ({ profileImage, name, time, onClick }) => {
  return (
    <div className="small-voice-message-item" onClick={onClick}>
      <img src={profileImage} alt={`${name} profile`} />
      <div className="item-name">{name}</div>
      <div className="item-time">{timeAgo(time)}</div>
    </div>
  );
};

export default SmallVoiceMessageItem;
