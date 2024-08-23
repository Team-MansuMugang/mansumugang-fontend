import { MarginPostion, MarginSize } from '../const/MarginType';
import MarginContainer from './MarginContainer';
import '../../src/index.css';

const PostDetailContent = ({ content }) => {
  const marginContainer = [
    { marginPostion: MarginPostion.TOP, marginSize: MarginSize.S18 },
    { marginPostion: MarginPostion.LEFT, marginSize: MarginSize.S18 },
    { marginPostion: MarginPostion.RIGHT, marginSize: MarginSize.S18 },
  ];

  return (
    <MarginContainer marginSet={marginContainer}>
      <div className="post-content">{content}</div>
    </MarginContainer>
  );
};

export default PostDetailContent;
