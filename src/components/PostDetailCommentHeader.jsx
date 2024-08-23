import React, { useState } from 'react';
import EmptyHeart from '../assets/svg/cards-heart-outline.svg?react';
import FillHeart from '../assets/svg/cards-heart.svg?react';

const PostDetailCommentHeader = ({ commentCount, likeCount }) => {
  const [isHearted, setIsHearted] = useState(false);

  const toggleHeart = () => {
    setIsHearted(!isHearted);
  };

  return (
    <div className="post-header">
      <span>댓글 {commentCount}개</span>
      <div className="heart-button-container">
        <button className={`heart-button ${isHearted ? 'hearted' : ''}`} onClick={toggleHeart}>
          {isHearted ? <FillHeart /> : <EmptyHeart />}
        </button>
        <span>{likeCount}</span>
      </div>
    </div>
  );
};

export default PostDetailCommentHeader;
