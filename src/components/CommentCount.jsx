import './CommentCount.css';
import '../index.css';
import CommentMode from '../assets/svg/mode-comment.svg?react';

const CommentCount = ({ children }) => {
  return (
    <div className="comment-count">
      <div className="mode-comment">
        <CommentMode></CommentMode>
      </div>
      <p>{children}</p>
    </div>
  );
};

export default CommentCount;
