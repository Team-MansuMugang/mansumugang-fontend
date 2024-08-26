import React, { useState, useEffect } from 'react';
import './CategoryHeader.css';
import '../index.css';
import ArrowDown from '../assets/svg/keyboard-arrow-down.svg?react';
import ChevronLeft from '../assets/svg/chevron-left.svg?react';
import postCategory from '../const/postCategory';

const CategoryHeader = ({
  rightText = '작성',
  rightTextColor = 'default',
  onClickLeft,
  onClickRight,
  onSelected,
  initSelected = '카테고리',
}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('카테고리');

  useEffect(() => {
    setSelectedCategory(initSelected);
  }, [initSelected]);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setDropdownOpen(false);
    if (onSelected) {
      onSelected(category);
    }
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
          <button className={`button right-button ${rightTextColor}`} onClick={onClickRight}>
            <span>{rightText}</span>
          </button>
        )}
      </div>

      {isDropdownOpen && (
        <div className="category-overlay">
          <div className="category-dropdown">
            {Object.values(postCategory).map((category) => (
              <div
                key={category}
                className="category-item"
                onClick={() => handleCategorySelect(category)}
              >
                {category}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryHeader;
