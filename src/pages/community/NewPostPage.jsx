import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryHeader from '../../components/CategoryHeader';
import './NewPostPage.css';
import PostPictureUpload from '../../components/PostPictureUpload';
import postCategory from '../../const/postCategory';
import submitPost from '../../apis/api/submitPost';

const NewPostPage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(undefined);
  const [images, setImages] = useState([]);

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

  const submitPostHandler = () => {
    console.log('제목:', title);
    console.log('내용:', content);
    console.log(
      '카테고리:',
      Object.keys(postCategory).find((key) => postCategory[key] === selectedCategory),
    );
    console.log('이미지:', images);
    submitPost(
      {
        title,
        content,
        categoryCode: Object.keys(postCategory).find(
          (key) => postCategory[key] === selectedCategory,
        ),
      },
      images,
    );
  };

  const handleImagesChange = (newImages) => {
    setImages(newImages);
    console.log(newImages);
  };

  return (
    <>
      <CategoryHeader
        rightText="작성"
        onClickLeft={() => navigate(-1)}
        onSelected={(category) => setSelectedCategory(category)}
        onClickRight={submitPostHandler}
      />
      <div className="new-post-page">
        <textarea
          placeholder="제목을 입력하세요"
          value={title}
          onChange={handleTitleChange}
          className="title-input"
          ref={titleRef}
          rows="1"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault(); // 줄바꿈 막음
            }
          }}
        />
        <textarea
          placeholder="내용을 입력하세요"
          value={content}
          onChange={handleContentChange}
          className="content-textarea"
          ref={contentRef}
        />

        <PostPictureUpload onImagesChange={handleImagesChange} />
      </div>
    </>
  );
};

export default NewPostPage;
