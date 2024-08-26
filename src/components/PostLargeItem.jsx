import './PostLargeItem.css';
import '../index.css';

const PostLargeItem = ({ profileImage, name, date, views }) => {
  return (
    <div className="post-large-item">
      <img src={profileImage} alt={`${name} profile`} />
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
