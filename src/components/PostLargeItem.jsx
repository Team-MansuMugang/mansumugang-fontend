import './PostLargeItem.css';
import '../index.css';
import AccountCircleIcon from '../assets/svg/account-circle.svg?react';

const PostLargeItem = ({ profileImage, name, date, views }) => {
  profileImage = '';
  return (
    <div className="post-large-item">
      {profileImage ? (
        <img src={profileImage} alt={`${name} profile`} />
      ) : (
        <div className="icon-wrap">
          <AccountCircleIcon />
        </div>
      )}
      <div className="infos">
        <span>{name}</span>
        <div className="details">
          <span>{date}</span>
          {/* <span>{`조회수 ${views}`}</span> */}
        </div>
      </div>
    </div>
  );
};

export default PostLargeItem;
