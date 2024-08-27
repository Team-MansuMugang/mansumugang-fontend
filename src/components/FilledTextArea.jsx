import React, { useState, useEffect } from 'react';
import './FilledTextArea.css';
import '../index.css';

const FilledTextArea = ({ init = '', placeholder = '입력칸', onTextChange }) => {
  const [text, setText] = useState(init);

  useEffect(() => setText(init), [init]);

  const handleChange = (event) => {
    setText(event.target.value);
    if (onTextChange) onTextChange(event.target.value);
  };

  return (
    <div className="filled-text-area">
      <textarea placeholder={placeholder} value={text} onChange={handleChange} />
    </div>
  );
};

export default FilledTextArea;
