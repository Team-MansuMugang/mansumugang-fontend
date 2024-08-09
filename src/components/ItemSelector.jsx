import React, { useState } from 'react';
import './ItemSelector.css';
import '../index.css';
import KeyboardArrowDown from '../assets/svg/keyboard-arrow-down.svg?react';

const ItemSelector = ({ items = ['테스트1', '테스트2', '테스트3'], onSelect }) => {
  const [selectedItem, setSelectedItem] = useState(items[0] || ''); // 초기 상태는 첫 번째 아이템
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    setIsOpen(false);

    if (onSelect) onSelect(item);
  };

  return (
    <div className="item-selector">
      <h2 onClick={handleToggle}>
        {selectedItem} <KeyboardArrowDown />
      </h2>
      {isOpen && (
        <ul>
          {items.map((item, index) => (
            <li key={index} onClick={() => handleSelectItem(item)}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ItemSelector;
