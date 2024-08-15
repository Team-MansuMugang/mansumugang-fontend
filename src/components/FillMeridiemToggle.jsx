import React, { useState } from 'react';
import './FillMeridiemToggle.css';
import '../index.css';
import ArrowBack2Icon from '../assets/svg/arrow-back-2.svg?react';

const FillMeridiemToggle = () => {
  const [isPM, setIsPM] = useState(false);

  const toggleMeridiem = () => {
    setIsPM((prev) => !prev);
  };

  return (
    <button className="filled-meridiem-toggle" onClick={toggleMeridiem}>
      <span>{isPM ? '오후' : '오전'}</span>
      <div className="toggle-icons">
        <ArrowBack2Icon />
        <ArrowBack2Icon />
      </div>
    </button>
  );
};

export default FillMeridiemToggle;
