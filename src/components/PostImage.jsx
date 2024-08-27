import './PostImage.css';
import '../index.css';

const PostImage = ({ src }) => {
  return (
    <div className="post-image-container">
      <div className="post-image">
        <img src={src} alt="Post" />
      </div>
    </div>
  );
};

export default PostImage;
