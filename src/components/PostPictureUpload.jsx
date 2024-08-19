import React, { useState } from 'react';
import AddImg from '../assets/svg/add.svg?react';
import DeleteImg from '../assets/svg/check-indeterminate-small.svg?react';
import './PostPictureUpload.css';
import '../index.css';

function PostPictureUpload() {
  const [images, setImages] = useState([]);
  const [modalImage, setModalImage] = useState(null);

  const handleAddImage = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const fileType = file.type;

      if (fileType.startsWith('image/')) {
        const newImageUrl = URL.createObjectURL(file);
        setImages([...images, newImageUrl]);
        event.target.value = '';
      } else {
        alert('사진 파일을 넣어주세요!!');
        event.target.value = '';
      }
    }
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const openModal = (image) => {
    setModalImage(image);
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
              src={image}
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
