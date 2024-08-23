import React, { createContext, useState } from 'react';

// Context 생성
export const CommentContext = createContext();

// Provider 컴포넌트 생성
export const CommentProvider = ({ children }) => {
  const [comments, setComments] = useState([]);
  const [commentCursor, setCommentCursor] = useState(null);

  const [replyCursor, setReplyCursor] = useState(new Map());

  const handleCommentUpdate = (newComment) => {
    setComments((prev) => [...prev, ...newComment]);
  };

  const handleCommentCursorUpdate = (newCursor) => {
    setCommentCursor(newCursor);
  };

  const handleReplyUpdate = (commentIndex, replies) => {
    console.log(replies);

    setComments((prev) => {
      console.log(prev);

      const copiedComment = [...prev];
      copiedComment[commentIndex].reply.replies = [
        ...copiedComment[commentIndex].reply.replies,
        ...replies,
      ];
      return copiedComment;
    });
  };

  const handleReplyCursorUpdate = (commentIndex, newCursor) => {
    setReplyCursor((prev) => {
      const copiedReplyCousorMap = prev;
      copiedReplyCousorMap.set(commentIndex, newCursor);
      return copiedReplyCousorMap;
    });
  };

  const handleCommentDelete = (index) => {
    setComments((prev) => {
      // prev 배열의 복사본을 만듭니다.
      const updatedComments = [...prev];

      updatedComments[index].comment.creator = '알 수 없음';
      updatedComments[index].comment.content = '삭제된 댓글입니다.';
      // 새로운 배열을 반환합니다.
      return updatedComments;
    });
  };

  const handleReplyDelete = (index) => {
    setReplies((prev) => {
      // prev 배열의 복사본을 만듭니다.
      const updatedReplies = [...prev];

      updatedReplies[index].creator = '알 수 없음';
      updatedReplies[index].content = '삭제된 답글입니다.';

      return updatedReplies;
    });
  };

  return (
    <CommentContext.Provider
      value={{
        comments,
        commentCursor,
        replyCursor,
        handleCommentUpdate,
        handleCommentCursorUpdate,
        handleReplyCursorUpdate,
        handleReplyUpdate,
        handleCommentDelete,
        handleReplyDelete,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};
