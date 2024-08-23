import PostCommentItem from './PostCommentItem';
import fetchCommentList from '../apis/api/fetchCommentList';
import { ExpiredAccessTokenError, NotValidAccessTokenError } from '../apis/utility/errors';
import { useInView } from 'react-intersection-observer';
import { useContext, useEffect, useState } from 'react';
import { CommentContext } from '../provider/CommentProvider';

const PostDetailCommentList = ({ postId, onChangeInputStatus }) => {
  // const [currnetCommentCursor, setCurrentCommentCursor] = useState(null);
  // const [comments, setComments] = useState([]);

  const [ref, inView] = useInView();

  const { comments, commentCursor, handleCommentUpdate, handleCommentCursorUpdate } =
    useContext(CommentContext);

  useEffect(() => {
    const fetchCommunitPage = async () => {
      try {
        const newComment = await fetchCommentList(postId, commentCursor);

        if (newComment.comments.length > 0) {
          // 불러운 댓글 데이터가 1개 이상인 경우
          // setComments((prev) => [...prev, ...newComment.comments]);
          // setCurrentCommentCursor(newComment.comments.at(-1).comment.commentId);
          handleCommentUpdate(newComment.comments);
          handleCommentCursorUpdate(newComment.comments.at(-1).comment.commentId);
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

    if (inView) {
      fetchCommunitPage();
    }
  }, [inView]);

  return (
    <>
      {comments.map((commentData, index) => (
        <PostCommentItem
          index={index}
          key={index}
          commentId={commentData.comment.commentId}
          replies={commentData.reply.replies}
          profileImage={'https://picsum.photos/200/300'}
          name={commentData.comment.creator}
          content={commentData.comment.content}
          date={commentData.comment.updatedAt}
          isDeleted={commentData.comment.deletedAt !== null ? true : false}
          onChangeInputStatus={onChangeInputStatus}
        />
      ))}
      <div ref={ref} />
    </>
  );
};

export default PostDetailCommentList;
