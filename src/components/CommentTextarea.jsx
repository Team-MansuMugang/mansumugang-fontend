import React, { useState, useRef, useEffect } from 'react';
import SendOutLineIcon from '../assets/svg/send-outline-rounded.svg?react';
import './CommentTextarea.css';
import '../index.css';

const CommentTextarea = ({ onSubmit }) => {
  const [comment, setComment] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      // 자동 높이 조정
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [comment]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSendClick = () => {
    if (comment.trim()) {
      if (onSubmit) onSubmit(comment);
      setComment(''); // 전송 후 텍스트 초기화
    }
  };

  return (
    <div className="comment-input-container">
      <textarea
        placeholder="따뜻한 댓글을 달아주세요"
        value={comment}
        onChange={handleCommentChange}
        ref={textareaRef}
        rows="1"
      />
      <button
        onClick={handleSendClick}
        disabled={!comment.trim()} // 댓글이 없으면 버튼 비활성화
        className={`send-button ${comment.trim() ? 'active' : ''}`}
      >
        <SendOutLineIcon />
      </button>
    </div>
  );
};

export default CommentTextarea;
