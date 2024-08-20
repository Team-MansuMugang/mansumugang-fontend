import React, { useState } from 'react';
import './CategoryHeader.css';
import ArrowDown from '../assets/svg/keyboard-arrow-down.svg?react';
import ChevronLeft from '../assets/svg/chevron-left.svg?react';

const CategoryHeader = ({ rightText = '작성', onClickLeft, onClickRight }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('카테고리');

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setDropdownOpen(false);
  };

  return (
    <>
      <div className={`category-header ${isDropdownOpen ? 'hidden' : ''}`}>
        {!isDropdownOpen && (
          <button className="button left-button" onClick={onClickLeft}>
            <ChevronLeft />
          </button>
        )}
        <div className="category-title" onClick={toggleDropdown}>
          <h1>{selectedCategory}</h1>
          <ArrowDown />
        </div>
        {!isDropdownOpen && (
          <button className="button right-button" onClick={onClickRight}>
            <span>{rightText}</span>
          </button>
        )}
      </div>

      {isDropdownOpen && (
        <div className="category-overlay">
          <div className="category-dropdown">
            {['자유', '고혈압', '당뇨', '저혈압', '치매', '암', '기타 질병', '홍보'].map(
              (category) => (
                <div
                  key={category}
                  className="category-item"
                  onClick={() => handleCategorySelect(category)}
                >
                  {category}
                </div>
              ),
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryHeader;
