import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FloatingActionButton.css';
import '../index.css';
import Add from '../assets/svg/add.svg?react';

const FloatingActionButton = ({
  title,
  items = [{ title: '첫 화면으로 이동합니다', url: '/' }],
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = (url) => {
    navigate(url);
    setIsOpen(false); // 메뉴를 닫음
  };

  return (
    <>
      <div
        className={`floating-action-button-overlay ${isOpen ? 'show' : ''}`}
        onClick={handleToggle}
      />
      <div className={`floating-action-button ${isOpen ? 'open' : 'closed'}`}>
        <ul>
          <li className="title">{title}</li>
          {items.map((item, index) => (
            <li key={index} onClick={() => handleClick(item.url)}>
              {item.icon}
              {item.title}
            </li>
          ))}
        </ul>
        <Add onClick={handleToggle} />
      </div>
    </>
  );
};

export default FloatingActionButton;
