import { MarginPostion, MarginSize } from '../const/MarginType';
import { getPostCategory } from '../const/PostCategoryCode';
import CommunityTag from './CommunityTag';
import MarginContainer from './MarginContainer';

const PostDetailTag = ({ categoryCode }) => {
  const marginContainer = [
    { marginPostion: MarginPostion.TOP, marginSize: MarginSize.S18 },
    { marginPostion: MarginPostion.LEFT, marginSize: MarginSize.S18 },
    { marginPostion: MarginPostion.RIGHT, marginSize: MarginSize.S18 },
  ];

  return (
    <MarginContainer marginSet={marginContainer}>
      <CommunityTag disabled={false} children={getPostCategory(categoryCode)} />
    </MarginContainer>
  );
};

export default PostDetailTag;
