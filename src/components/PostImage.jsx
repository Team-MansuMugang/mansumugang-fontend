import './PostImage.css';
import '../index.css';

const PostImage = ({ postImage }) => {
  return (
    <div className="post-image-container">
      <div className="post-image">
        <img src={postImage} alt="Post" />
      </div>
    </div>
  );
};

export default PostImage;
