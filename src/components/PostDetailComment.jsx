import PostDetailCommentHeader from './PostDetailCommentHeader';
import { MarginPostion, MarginSize } from '../const/MarginType';
import MarginContainer from './MarginContainer';
import PostDetailCommentInput from './PostDetailCommentInput';
import PostDetailCommentContainer from './PostDetailCommentContainer';
import PostDetailCommentList from './PostDetailCommentList';
import { useState } from 'react';
import submitComment from '../apis/api/submitComment';
import submitReply from '../apis/api/submitReply';
import updateComment from '../apis/api/updateComment';
import updateReply from '../apis/api/updateReply';

const PostDetailComment = ({ commentCount, postId, likeCount }) => {
  const marginContainer = [
    { marginPostion: MarginPostion.LEFT, marginSize: MarginSize.S18 },
    { marginPostion: MarginPostion.RIGHT, marginSize: MarginSize.S18 },
  ];

  const [inputStatus, setInputStatus] = useState({
    type: 'COMMENT',
    method: 'ADD',
    id: null,
    index: null,
  });

  const [inputValue, setInputValue] = useState('');

  const handleInputValueChange = (value) => {
    setInputValue(value);
  };

  const handleInputSubmit = () => {
    if (inputValue.trim()) {
      // 댓글 전송 처리
      console.log('댓글 전송:', inputValue.trim());
      setInputValue('');
    }

    if (inputStatus.type === 'COMMENT') {
      if (inputStatus.method === 'ADD') {
      }
    }

    const addNewComment = async () => {
      const newComment = await submitComment(postId, content);
    };
  };

  const handleInputStausChange = (type, method, id, index) => {
    setInputStatus({
      type: type,
      method: method,
      id,
      index,
    });
  };

  return (
    <MarginContainer marginSet={marginContainer}>
      <PostDetailCommentContainer>
        <PostDetailCommentHeader commentCount={commentCount} likeCount={likeCount} />
        <PostDetailCommentList postId={postId} onChangeInputStatus={handleInputStausChange} />
        <PostDetailCommentInput
          inputValue={inputValue}
          onChangeInputValue={handleInputValueChange}
          onSubmit={handleInputSubmit}
        />
      </PostDetailCommentContainer>
    </MarginContainer>
  );
};

export default PostDetailComment;
