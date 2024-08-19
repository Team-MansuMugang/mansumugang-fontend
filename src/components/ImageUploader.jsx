import React, { useState, useEffect } from 'react';
import './ImageUploader.css';
import DrugsIcon from '../assets/svg/drugs.svg?react';
import AccountCircleIcon from '../assets/svg/account-circle.svg?react';

/**
 * ImageUploader 컴포넌트는 이미지 업로드 및 삭제 기능을 제공합니다.
 *
 * @component
 * @param {Object} props - 컴포넌트의 props
 * @param {string} [props.type='profile'] - 표시할 기본 아이콘의 타입 ('profile', 'drugs' 등)
 * @param {function} [props.onImageUpload] - 이미지 업로드 후 호출되는 콜백 함수
 * @param {Object} [props.init] - 초기 이미지 객체
 * @returns {JSX.Element} 이미지 업로드 컴포넌트
 */
function ImageUploader({ type = 'profile', onImageUpload, init }) {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    console.log(init);
    setImageUrl(init);
  }, [init]);

  /**
   * 파일이 선택될 때 호출되는 함수입니다.
   * 선택된 파일을 미리보기 위해 이미지 URL을 생성합니다.
   *
   * @param {Event} event - 파일 입력 change 이벤트
   */
  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const newImageUrl = URL.createObjectURL(file);
      setImageUrl(newImageUrl);

      // 이미지 파일을 콜백 함수로 전달
      if (onImageUpload) onImageUpload(file);

      // 파일 선택 후 입력 값을 초기화
      event.target.value = '';
    }
  };

  /**
   * 이미지를 제거하는 함수입니다.
   * 이미지 URL을 null로 설정하고, 부모 컴포넌트에 null을 전달합니다.
   */
  const removeImage = () => {
    setImageUrl(null);
    if (onImageUpload) onImageUpload(null);
  };

  /**
   * 파일 입력을 클릭할 때 호출되는 함수입니다.
   * 이미지가 이미 선택되어 있을 경우, 이미지를 삭제하고 파일 선택 대화상자가 열리지 않도록 합니다.
   *
   * @param {Event} event - 파일 입력 click 이벤트
   */
  const handleInputClick = (event) => {
    if (imageUrl) {
      removeImage();
      event.preventDefault(); // 파일 선택 대화상자가 열리지 않도록 방지
    }
  };

  /**
   * 현재 상태에 따라 렌더링할 콘텐츠를 결정하는 함수입니다.
   *
   * @returns {JSX.Element} 렌더링할 콘텐츠
   */
  const renderContent = () => {
    if (imageUrl) {
      return (
        <>
          <img src={imageUrl} alt="Selected" className="button-image" />
          <span className="under-text">삭제하기</span>
        </>
      );
    } else if (type === 'drugs') {
      return (
        <>
          <DrugsIcon className="svg-image" />
          <span className="under-text">사진 추가</span>
        </>
      );
    } else if (type === 'profile') {
      return (
        <>
          <AccountCircleIcon className="svg-image" />
          <span className="under-text">사진 추가</span>
        </>
      );
    } else {
      return <span className="full-text">이미지 추가</span>;
    }
  };

  return (
    <div className="image-uploader">
      <input
        type="file"
        accept="image/*"
        id="image-upload"
        onChange={handleFileChange}
        onClick={handleInputClick}
      />
      <label htmlFor="image-upload" className="upload-button">
        {renderContent()}
      </label>
    </div>
  );
}

export default ImageUploader;
