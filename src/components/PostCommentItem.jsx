import './PostCommentItem.css';
import '../index.css';
import { MarginPostion, MarginSize } from '../const/MarginType';
import MarginContainer from './MarginContainer';
import { timeAgoByStr } from '../utility/dates';
import PostReply from './PostReply';
import deleteComment from '../apis/api/deleteComment';
import { useContext } from 'react';
import { CommentContext } from '../provider/CommentProvider';
import { ExpiredAccessTokenError, NotValidAccessTokenError } from '../apis/utility/errors';

const PostCommentItem = ({
  index,
  profileImage,
  commentId,
  name,
  content,
  date,
  isDeleted,
  onChangeInputStatus,
}) => {
  const marginContainer = [{ marginPostion: MarginPostion.TOP, marginSize: MarginSize.S18 }];

  const handelCommentUpdateBtnClick = () => {
    onChangeInputStatus('COMMENT', 'UPDATE', commentId, index);
  };

  const { handleCommentDelete } = useContext(CommentContext);

  const handleCommentDeleteBtnClick = async () => {
    try {
      await deleteComment({ commentId });
      handleCommentDelete(index);
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

  const handleReplyAddBtnClick = () => {
    onChangeInputStatus('REPLY', 'ADD', commentId, index);
  };

  return (
    <MarginContainer marginSet={marginContainer}>
      <div className="post-comment-item">
        <div className="item-comment-container">
          <div className="img-container">
            <img src={profileImage} alt={`${name} profile`} />
          </div>
          <div className="item-detail">
            <div className="item-header">
              <div className="left">
                <div className="item-name">{name}</div>
                <div className="item-date">{timeAgoByStr(date)}</div>
              </div>
              <div className="right">
                {isDeleted == false ? (
                  <>
                    <button onClick={handelCommentUpdateBtnClick}>수정</button>
                    <button onClick={handleCommentDeleteBtnClick}>삭제</button>
                    <button onClick={handleReplyAddBtnClick}>답글</button>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="item-data">{content}</div>
          </div>
        </div>
      </div>
      <PostReply
        commentIndex={index}
        commentId={commentId}
        onChangeInputStatus={onChangeInputStatus}
      />
    </MarginContainer>
  );
};

export default PostCommentItem;
