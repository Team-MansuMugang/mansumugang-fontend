import React, { useState, useEffect } from 'react';
import EmptyHeart from '../assets/svg/cards-heart-outline.svg?react';
import FillHeart from '../assets/svg/cards-heart.svg?react';
import './InteractionBar.css';
import '../index.css';

const InteractionBar = ({ commentCount, onHeartToggle, heartCount, isHearted = false }) => {
  const [viewHeart, setViewHeart] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    setViewHeart(isHearted);
  }, [isHearted]);

  const toggleHeart = () => {
    if (isDisabled) return;

    if (onHeartToggle) onHeartToggle(!viewHeart);
    setViewHeart(!viewHeart);

    setIsDisabled(true);

    setTimeout(() => {
      setIsDisabled(false);
    }, 1000); // 1초 동안 클릭 비활성화
  };

  return (
    <div className="interaction-bar">
      <span>댓글 {commentCount}개</span>
      <div className="heart-button-container">
        <span>{heartCount}</span>
        <button
          className={`heart-button ${viewHeart ? 'hearted' : ''}`}
          onClick={toggleHeart}
          disabled={isDisabled} // 버튼 비활성화 상태 반영
        >
          {viewHeart ? <FillHeart /> : <EmptyHeart />}
        </button>
      </div>
    </div>
  );
};

export default InteractionBar;
