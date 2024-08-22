import './CommunityLargeItem.css';
import '../index.css';
import CommentModeIcon from '../assets/svg/mode-comment.svg?react';

const CommunityLargeItem = ({ title, summary, onClick, category, count, time }) => {
  return (
    <div className="community-large-item" onClick={onClick}>
      <h2>{title}</h2>
      <p>{summary}</p>
      <div className="community-item-footer">
        <span className="category">{category}</span>
        <span className="divider">|</span>
        <div className="comment-count">
          <CommentModeIcon />
          <p>{count}</p>
        </div>
        <span className="divider">|</span>
        <span>{time} 전</span>
      </div>
    </div>
  );
};

export default CommunityLargeItem;
