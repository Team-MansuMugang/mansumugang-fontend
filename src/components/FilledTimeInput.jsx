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
    let value = e.target.value;
    if (value === '') {
      setInput('');
      return;
    }

    // 숫자 이외의 값이 입력되지 않도록 처리
    if (/[^0-9]/.test(value)) {
      return;
    }

    // 불필요한 0 제거
    value = value.replace(/^0+/, '');
    if (value === '') value = '0';

    let numericValue = parseInt(value, 10);

    if (type === 'hours') numericValue = Math.max(0, Math.min(numericValue, 12));
    if (type === 'minutes') numericValue = Math.max(0, Math.min(numericValue, 59));

    setInput(numericValue.toString());
    if (onInput) onInput(numericValue);
  };

  return (
    <label className="filled-time-input">
      <input type="text" value={input} placeholder="0" onChange={handleInput} />
      <span>{typeText(type)}</span>
    </label>
  );
};

export default FilledTimeInput;
