import React, { useState, useRef, useEffect } from 'react';
import SendOutLine from '../assets/svg/send-outline-rounded.svg?react';

const PostDetailCommentInput = ({ inputValue, onChangeInputValue, onSubmit }) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      // 자동 높이 조정
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [inputValue]); // 댓글 내용이 변경될 때마다 호출

  const handleCommentChange = (e) => {
    onChangeInputValue(e.target.value);
  };

  const handleSendButtonClick = () => {
    onSubmit();
  };

  return (
    <div className="comment-input-container">
      <div className="comment-input-wrapper">
        <textarea
          placeholder="따뜻한 댓글을 달아주세요"
          className="comment-input"
          value={inputValue}
          onChange={handleCommentChange}
          ref={textareaRef} // ref를 textarea에 설정
          rows="1" /* 기본 한 줄 표시 */
        />
        <button className="send-button" onClick={handleSendButtonClick}>
          <SendOutLine />
        </button>
      </div>
    </div>
  );
};

export default PostDetailCommentInput;
