import React, { useRef, useEffect } from 'react';
import CategoryHeader from '../../components/CategoryHeader';
import './NewPostPage.css';
import PostPictureUpload from '../../components/PostPictureUpload';

const NewPostPage = () => {
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');

  const titleRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.style.height = 'auto';
      titleRef.current.style.height = `${titleRef.current.scrollHeight}px`; // 내용에 맞게 높이 조절
    }
    if (contentRef.current) {
      contentRef.current.style.height = 'auto';
      contentRef.current.style.height = `${contentRef.current.scrollHeight}px`; // 내용에 맞게 높이 조절
    }
  }, [title, content]);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);

  return (
    <>
      <CategoryHeader rightText="작성" />
      <div className="new-post-page">
        <textarea
          placeholder="제목을 입력하세요"
          value={title}
          onChange={handleTitleChange}
          className="title-input"
          ref={titleRef}
          rows="1"
        />
        <textarea
          placeholder="내용을 입력하세요"
          value={content}
          onChange={handleContentChange}
          className="content-textarea"
          ref={contentRef}
        />
        <div className="post-picture-upload-container">
          <PostPictureUpload />
        </div>
      </div>
    </>
  );
};

export default NewPostPage;
