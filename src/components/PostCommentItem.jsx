import './PostCommentItem.css';
import '../index.css';

const PostCommentItem = ({ profileImage, name, data, onClick }) => {
  return (
    <div className="post-comment-item">
      <div className="item-comment-container">
        <div className="img-container">
          <img src={profileImage} alt={`${name} profile`} />
        </div>
        <div className="item-details">
          <div className="item-name">{name}</div>
          <div className="item-data">{data}</div>
          <button onClick={onClick}>답글 달기</button>
        </div>
      </div>
    </div>
  );
};

export default PostCommentItem;
