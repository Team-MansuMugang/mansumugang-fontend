import './PostReCommentItem.css';
import '../index.css';
import ArrowRight from '../assets/svg/subdirectory-arrow-right-rounded.svg?react';
import MarginContainer from './MarginContainer';
import { MarginPostion, MarginSize } from '../const/MarginType';
import { timeAgoByStr } from '../utility/dates';
import deleteReply from '../apis/api/deleteReply';
import { useContext } from 'react';
import { CommentContext } from '../provider/CommentProvider';

const PostReCommentItem = ({
  replyIndex,
  commentIndex,
  replyId,
  profileImage,
  name,
  data,
  date,
  isDeleted,
  onChangeInputStatus,
}) => {
  const marginContainer = [{ marginPostion: MarginPostion.TOP, marginSize: MarginSize.S15 }];

  const handleReplyUpdateBtnClick = () => {
    onChangeInputStatus('REPLY', 'UPDATE', replyId, replyIndex);
  };

  const { handleReplyDelete } = useContext(CommentContext);

  const handleReplyDeleteBtnClick = async () => {
    try {
      await deleteReply({ replyId });
      handleReplyDelete(replyIndex);
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
      <div className="post-re-comment-item">
        <ArrowRight className="arrow-icon" />
        <div className="item-re-comment-container">
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
                    <button onClick={handleReplyUpdateBtnClick}>수정</button>
                    <button onClick={handleReplyDeleteBtnClick}>삭제</button>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="item-data">{data}</div>
          </div>
        </div>
      </div>
    </MarginContainer>
  );
};

export default PostReCommentItem;
