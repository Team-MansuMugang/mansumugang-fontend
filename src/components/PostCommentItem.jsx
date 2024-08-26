import './PostCommentItem.css';
import '../index.css';

const PostCommentItem = ({
  profileImage,
  name,
  data,
  onReplyClick,
  onEditClick,
  cnDeleteClick,
  isOwner = false,
  isDeleted = false,
}) => {
  return (
    <div className="post-comment-item">
      <div className="item-comment-container">
        <div className="img-container">
          <img src={profileImage} alt={`${name} profile`} />
        </div>
        <div className="item-details">
          <div className="item-name">{name}</div>
          <div className="item-data">{data}</div>
          <div className="bottom-container">
            {!isDeleted && <button onClick={onReplyClick}>답글 달기</button>}
            {isOwner && (
              <>
                <span>·</span>
                <button onClick={onEditClick}>수정</button>
                <span>·</span>
                <button onClick={cnDeleteClick}>삭제</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCommentItem;
