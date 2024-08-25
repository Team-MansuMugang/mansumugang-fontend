import React, { useState } from 'react';
import './CategoryHeader.css';
import ArrowDown from '../assets/svg/keyboard-arrow-down.svg?react';
import ChevronLeft from '../assets/svg/chevron-left.svg?react';
import postCategory from '../const/postCategory';

const CategoryHeader = ({ rightText = '작성', onClickLeft, onClickRight, onSelected }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('카테고리');

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
          <button className="button right-button" onClick={onClickRight}>
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
