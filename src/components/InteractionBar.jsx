import React, { useState, useRef, useEffect } from 'react';
import EmptyHeart from '../assets/svg/cards-heart-outline.svg?react';
import FillHeart from '../assets/svg/cards-heart.svg?react';
import './InteractionBar.css';
import '../index.css';

const InteractionBar = ({ commentCount, heartCount }) => {
  const [isHearted, setIsHearted] = useState(false);

  const toggleHeart = () => {
    setIsHearted(!isHearted);
  };

  return (
    <div className="interaction-bar">
      <span>댓글 {commentCount}개</span>
      <div className="heart-button-container">
        <span>{heartCount}</span>
        <button className={`heart-button ${isHearted ? 'hearted' : ''}`} onClick={toggleHeart}>
          {isHearted ? <FillHeart /> : <EmptyHeart />}
        </button>
      </div>
    </div>
  );
};

export default InteractionBar;
