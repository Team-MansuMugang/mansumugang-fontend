import { MarginPostion, MarginSize } from '../const/MarginType';
import MarginContainer from './MarginContainer';
import PostLargeItem from './PostLargeItem';

const PostDetailHeader = ({ profileImage, nickname, date }) => {
  const marginContainer = [
    { marginPostion: MarginPostion.TOP, marginSize: MarginSize.S18 },
    { marginPostion: MarginPostion.BOTTOM, marginSize: MarginSize.S18 },
    { marginPostion: MarginPostion.LEFT, marginSize: MarginSize.S18 },
    { marginPostion: MarginPostion.RIGHT, marginSize: MarginSize.S18 },
  ];

  return (
    <MarginContainer marginSet={marginContainer}>
      <PostLargeItem
        profileImage={'https://picsum.photos/200/300'}
        nickname={nickname}
        date={date}
      ></PostLargeItem>
    </MarginContainer>
  );
};

export default PostDetailHeader;
