import './PostReCommentItem.css';
import '../index.css';
import ArrowRight from '../assets/svg/subdirectory-arrow-right-rounded.svg?react';

const PostReCommentItem = ({ profileImage, name, data, onClick }) => {
  return (
    <div className="post-re-comment-item">
      <ArrowRight className="arrow-icon" />
      <div className="item-re-comment-container">
        <div className="img-container">
          <img src={profileImage} alt={`${name} profile`} />
        </div>
        <div className="item-details">
          <div className="item-name">{name}</div>
          <div className="item-data">{`${data}`}</div>
        </div>
        <button onClick={onClick}>답글</button>
      </div>
    </div>
  );
};

export default PostReCommentItem;
