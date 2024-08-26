import './CommunityLargeItem.css';
import '../index.css';
import CommentMode from '../assets/svg/mode-comment.svg?react';

const CommunityLargeItem = ({ title, summary, onClick, children, count, time }) => {
  return (
    <div className="community-large-item" onClick={onClick}>
      <h2>{title}</h2>
      <p className="community-summary">{summary}</p>
      <div className="community-item-footer">
        <button className="small-button">{children}</button>
        <span className="divider">|</span>
        <CommentMode className="mode-comment" />
        <p>{count}</p>
        <span className="divider">|</span>
        <span>{time} 전</span>
      </div>
    </div>
  );
};

export default CommunityLargeItem;
