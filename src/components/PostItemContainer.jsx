import React, { useState, useRef, useEffect } from 'react';
import EmptyHeart from '../assets/svg/cards-heart-outline.svg?react';
import FillHeart from '../assets/svg/cards-heart.svg?react';
import SendOutLine from '../assets/svg/send-outline-rounded.svg?react';
import './PostItemContainer.css';

const PostItemContainer = ({ commentCount, heartCount }) => {
  const [isHearted, setIsHearted] = useState(false);
  const [comment, setComment] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      // 자동 높이 조정
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [comment]); // 댓글 내용이 변경될 때마다 호출

  const toggleHeart = () => {
    setIsHearted(!isHearted);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSendClick = () => {
    if (comment.trim()) {
      // 댓글 전송 처리
      console.log('댓글 전송:', comment);
      setComment('');
    }
  };

  return (
    <div className="post-item-container">
      <div className="post-header">
        <span>댓글 {commentCount}개</span>
        <div className="heart-button-container">
          <button className={`heart-button ${isHearted ? 'hearted' : ''}`} onClick={toggleHeart}>
            {isHearted ? <FillHeart /> : <EmptyHeart />}
          </button>
          <span>{heartCount}</span>
        </div>
      </div>
      <div className="comment-input-container">
        <div className="comment-input-wrapper">
          <textarea
            placeholder="따뜻한 댓글을 달아주세요"
            className="comment-input"
            value={comment}
            onChange={handleCommentChange}
            ref={textareaRef} // ref를 textarea에 설정
            rows="1" /* 기본 한 줄 표시 */
          />
          <button className="send-button" onClick={handleSendClick}>
            <SendOutLine />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostItemContainer;
