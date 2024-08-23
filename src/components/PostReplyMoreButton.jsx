import './PostCommentItem.css';
import '../index.css';
import { MarginPostion, MarginSize } from '../const/MarginType';
import MarginContainer from './MarginContainer';
import './PostReplyMoreButton.css';
import fetchReplyList from '../apis/api/fetchReplyList';
import { ExpiredAccessTokenError, NotValidAccessTokenError } from '../apis/utility/errors';
import { useContext } from 'react';
import { CommentContext } from '../provider/CommentProvider';

const PostReplyMoreButton = ({ commentId, commentIndex }) => {
  const marginContainer = [{ marginPostion: MarginPostion.TOP, marginSize: MarginSize.S15 }];

  const { replyCursor, handleReplyCursorUpdate, handleReplyUpdate } = useContext(CommentContext);

  const handleMoreButtonClick = async () => {
    try {
      const newReply = await fetchReplyList(commentId, replyCursor.get(commentIndex));

      if (newReply.replies.length > 0) {
        handleReplyUpdate(commentIndex, newReply.replies);
        handleReplyCursorUpdate(commentIndex, newReply.replies.at(-1).replyId);
      }
    } catch (error) {
      if (error instanceof ExpiredAccessTokenError) {
        try {
          await renewRefreshToken();
          fetchCommunitPage();
        } catch (error) {
          navigate('/');
        }
      } else if (error instanceof NotValidAccessTokenError) navigate('/');
      else console.error(error);
    }
  };

  return (
    <MarginContainer marginSet={marginContainer}>
      <button className="post-re-comment-more-button" onClick={handleMoreButtonClick}>
        답글 더보기
      </button>
    </MarginContainer>
  );
};

export default PostReplyMoreButton;
