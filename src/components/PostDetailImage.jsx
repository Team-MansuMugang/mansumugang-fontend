import { MarginPostion, MarginSize } from '../const/MarginType';
import MarginContainer from './MarginContainer';
import PostDetailImageItem from './PostDetailImageItem';
import RowScrollContainer from './RowScrollContainer';

const PostDetailImage = ({ postImageApiUrlPrefix, images }) => {
  const marginContainer = [
    { marginPostion: MarginPostion.TOP, marginSize: MarginSize.S18 },
    { marginPostion: MarginPostion.BOTTOM, marginSize: MarginSize.S18 },
    { marginPostion: MarginPostion.LEFT, marginSize: MarginSize.S18 },
  ];

  return (
    <div className="post-image-container">
      <MarginContainer marginSet={marginContainer}>
        <RowScrollContainer>
          {images.map((postImage, index) => (
            <PostDetailImageItem
              key={index}
              src={postImageApiUrlPrefix + postImage.postImageName}
            />
          ))}
        </RowScrollContainer>
      </MarginContainer>
    </div>
  );
};

export default PostDetailImage;
