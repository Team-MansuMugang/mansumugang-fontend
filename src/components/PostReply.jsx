import './PostCommentItem.css';
import '../index.css';
import { MarginPostion, MarginSize } from '../const/MarginType';
import MarginContainer from './MarginContainer';
import PostReCommentItem from './PostReCommentItem';
import PostReplyMoreButton from './PostReplyMoreButton';
import { useContext, useEffect } from 'react';
import { CommentContext } from '../provider/CommentProvider';

const PostReply = ({ commentId, commentIndex, onChangeInputStatus }) => {
  const marginContainer = [{ marginPostion: MarginPostion.TOP, marginSize: MarginSize.S15 }];

  // const [replies, setReplies] = useState(initalReplies);
  // const [currentReplyCursor, setCurrentReplyCursor] = useState(
  //   replies.length > 0 ? replies.at(-1).replyId : null,
  // );

  const { comments, handleReplyCursorUpdate } = useContext(CommentContext);

  const replies = comments[commentIndex].reply.replies;

  useEffect(() => {
    const initalCursor = replies.length > 0 ? replies.at(-1).replyId : null;
    handleReplyCursorUpdate(commentIndex, initalCursor);
  }, []);

  return (
    <MarginContainer marginSet={marginContainer}>
      {replies.map((reply, index) => (
        <PostReCommentItem
          key={index}
          replyIndex={index}
          commentIndex={commentIndex}
          profileImage={'https://picsum.photos/200/300'}
          replyId={reply.replyId}
          name={reply.creator}
          data={reply.content}
          date={reply.updatedAt}
          isDeleted={reply.deletedAt !== null ? true : false}
          onChangeInputStatus={onChangeInputStatus}
        />
      ))}
      {replies.length > 0 ? (
        <PostReplyMoreButton commentIndex={commentIndex} commentId={commentId} />
      ) : (
        <></>
      )}
    </MarginContainer>
  );
};

export default PostReply;
