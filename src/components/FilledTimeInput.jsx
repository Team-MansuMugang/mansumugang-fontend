import './FilledTimeInput.css';
import '../index.css';
import { useState, useEffect } from 'react';

const FilledTimeInput = ({ init = '', onInput, type = 'hours' }) => {
  const [input, setInput] = useState(init);
  const typeText = (type) => {
    if (type === 'hours') return '시';
    if (type === 'minutes') return '분';
    return type;
  };

  useEffect(() => setInput(init), [init]);

  const handleInput = (e) => {
    let value = e.target.value === '' ? '' : parseInt(e.target.value, 10);

    if (type === 'hours' && value !== '') value = Math.max(0, Math.min(value, 12));
    if (type === 'minutes' && value !== '') value = Math.max(0, Math.min(value, 59));

    setInput(value);
    if (onInput) onInput(value);
  };

  return (
    <label className="filled-time-input">
      <input type="number" pattern="\d*" value={input} placeholder="0" onChange={handleInput} />
      <span>{typeText(type)}</span>
    </label>
  );
};

export default FilledTimeInput;
