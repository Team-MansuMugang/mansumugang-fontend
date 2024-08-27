import React, { useState } from 'react';
import AddImg from '../assets/svg/add.svg?react';
import DeleteImg from '../assets/svg/check-indeterminate-small.svg?react';
import './PostPictureUpload.css';
import '../index.css';

function PostPictureUpload({ onImagesChange }) {
  // onImagesChange 콜백 추가
  const [images, setImages] = useState([]);
  const [modalImage, setModalImage] = useState(null);

  const handleAddImage = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const files = Array.from(event.target.files);
      const newImages = [...images, ...files];

      setImages(newImages);
      onImagesChange(newImages); // 이미지 객체 배열을 콜백 함수로 전달
      event.target.value = ''; // 파일 입력 초기화
    } else {
      alert('사진 파일을 넣어주세요!!');
    }
  };

  const handleRemoveImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    onImagesChange(newImages); // 업데이트된 이미지 객체 배열을 콜백 함수로 전달
  };

  const openModal = (image) => {
    const imageUrl = URL.createObjectURL(image);
    setModalImage(imageUrl);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <div className="post-picture-upload">
      <div className="image-container">
        <div className="image-box add-image">
          <input
            type="file"
            accept="image/*"
            id="image-upload"
            onChange={handleAddImage}
            multiple // 다중 파일 선택 가능하도록 설정
            style={{ display: 'none' }}
          />
          <label htmlFor="image-upload" className="add-photo-button">
            <AddImg className="add-icon" />
            <span className="add-text">사진 추가</span>
          </label>
        </div>
        {images.map((image, index) => (
          <div key={index} className="image-box">
            <img
              src={URL.createObjectURL(image)} // 이미지 객체를 URL로 변환하여 표시
              alt={`Uploaded ${index}`}
              className="image"
              onClick={() => openModal(image)}
            />
            <button className="delete-button" onClick={() => handleRemoveImage(index)}>
              <DeleteImg />
            </button>
          </div>
        ))}
      </div>
      {modalImage && (
        <div className="modal" onClick={closeModal}>
          <img src={modalImage} alt="Expanded" className="modal-image" />
        </div>
      )}
    </div>
  );
}

export default PostPictureUpload;
