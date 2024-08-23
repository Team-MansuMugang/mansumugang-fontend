import './PostDetailImageItem.css';

const PostDetailImageItem = ({ src }) => {
  return (
    <img
      width={158}
      height={158}
      className="post-detail-small-image"
      src={`${src}`}
      alt={'게시물 이미지'}
    />
  );
};

export default PostDetailImageItem;
