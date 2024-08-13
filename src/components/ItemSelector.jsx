import React, { useState, useEffect } from 'react';
import './ItemSelector.css';
import '../index.css';
import KeyboardArrowDown from '../assets/svg/keyboard-arrow-down.svg?react';

const ItemSelector = ({ items = ['테스트1', '테스트2', '테스트3'], onSelect }) => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setSelectedItemIndex(0);
  }, [items]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectItem = (index) => {
    setSelectedItemIndex(index);
    setIsOpen(false);

    if (onSelect) onSelect(index);
  };

  return (
    <div className="item-selector">
      <h1 onClick={handleToggle}>
        {items[selectedItemIndex]} <KeyboardArrowDown />
      </h1>
      {isOpen && (
        <ul>
          {items.map((item, index) => (
            <li key={index} onClick={() => handleSelectItem(index)}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ItemSelector;
