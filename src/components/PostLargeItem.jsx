import './PostLargeItem.css';
import '../index.css';
import { parseLocalDateTime } from '../utility/dates';

const PostLargeItem = ({ profileImage, nickname, date, likes, onClick }) => {
  const { formattedDate, formattedTime } = parseLocalDateTime(date);

  return (
    <div className="post-large-item" onClick={onClick}>
      <div className="item-info-container">
        <img src={profileImage} alt={`${nickname} profile`} />
        <div className="item-details">
          <div className="item-name">{nickname}</div>
          <div className="item-post-info">
            <span className="item-date">{`${formattedDate} · ${formattedTime}`}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostLargeItem;
