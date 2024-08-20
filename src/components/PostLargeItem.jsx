import './PostLargeItem.css';
import '../index.css';

const PostLargeItem = ({ profileImage, name, date, views, onClick }) => {
  return (
    <div className="post-large-item" onClick={onClick}>
      <div className="item-info-container">
        <img src={profileImage} alt={`${name} profile`} />
        <div className="item-details">
          <div className="item-name">{name}</div>
          <div className="item-date-views">{`${date} 조회수  ${views}`}</div>
        </div>
      </div>
    </div>
  );
};

export default PostLargeItem;
