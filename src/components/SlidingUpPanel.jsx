import React, { useState } from 'react';
import './SlidingUpPanel.css'; // CSS 파일을 별도로 만듭니다.
import SlidingUpPanelHeader from './SlidingUpPanelHeader';

const SlidingUpPanel = ({ children, isOpened, onOpen, onClose, title }) => {
  const handleWrapperClick = () => {
    onClose();
  };

  const handleChildClick = (event) => {
    event.stopPropagation(); // 이벤트 버블링 방지
  };

  return (
    <div className={`slide-up-panel-container`}>
      <div className={`back-component ${isOpened ? 'open' : ''}`}>{children[0]}</div>
      <div
        className={`slide-up-panel-wrapper ${isOpened ? 'open' : ''}`}
        onClick={handleWrapperClick}
      >
        <div className={`slide-panel ${isOpened ? 'open' : ''}`} onClick={handleChildClick}>
          <SlidingUpPanelHeader title={title} onClose={onClose} />
          {children[1]}
        </div>
      </div>
    </div>
  );
};

export default SlidingUpPanel;
