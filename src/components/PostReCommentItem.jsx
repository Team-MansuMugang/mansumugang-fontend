import './PostReCommentItem.css';
import '../index.css';
import ArrowRight from '../assets/svg/subdirectory-arrow-right-rounded.svg?react';
import AccountCircleIcon from '../assets/svg/account-circle.svg?react';

const PostReCommentItem = ({
  profileImage,
  name,
  data,
  isOwner = false,
  onEditClick,
  onDeleteClick,
}) => {
  return (
    <div className="post-re-comment-item">
      <ArrowRight className="arrow-icon" />
      <div className="item-re-comment-container">
        <div className="img-container">
          {profileImage ? (
            <img src={profileImage} alt={`${name} profile`} />
          ) : (
            <AccountCircleIcon />
          )}
        </div>
        <div className="item-details">
          <div className="item-name">{name}</div>
          <div className="item-data">{data}</div>
          <div className="bottom-container">
            {isOwner && (
              <>
                <button onClick={onEditClick}>수정</button>
                <span>·</span>
                <button onClick={onDeleteClick}>삭제</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostReCommentItem;
