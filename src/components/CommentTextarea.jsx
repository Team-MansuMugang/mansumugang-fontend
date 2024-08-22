import React, { useState, useRef, useEffect } from 'react';
import SendOutLineIcon from '../assets/svg/send-outline-rounded.svg?react';
import './CommentTextarea.css';
import '../index.css';

const CommentTextarea = () => {
  const [comment, setComment] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      // 자동 높이 조정
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [comment]); // 댓글 내용이 변경될 때마다 호출

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
    <div className="comment-input-container">
      <textarea
        placeholder="따뜻한 댓글을 달아주세요"
        value={comment}
        onChange={handleCommentChange}
        ref={textareaRef} // ref를 textarea에 설정
        rows="1" // 기본 한 줄 표시
      />
      <button onClick={handleSendClick}>
        <SendOutLineIcon />
      </button>
    </div>
  );
};

export default CommentTextarea;
