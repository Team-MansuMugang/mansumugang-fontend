import './FilledTimeInput.css';
import '../index.css';

const FilledTimeInput = ({ onInput, type = 'hours' }) => {
  const typeText = (type) => {
    if (type === 'hours') return '시';
    if (type === 'minutes') return '분';
    return type;
  };

  const handleInput = (e) => {
    let value = e.target.value === '' ? 0 : parseInt(e.target.value, 10);

    if (type === 'hours') value = Math.max(0, Math.min(value, 12));
    if (type === 'minutes') value = Math.max(0, Math.min(value, 59));

    e.target.value = value;
    if (onInput) onInput(value);
  };

  return (
    <label className="filled-time-input">
      <input type="number" placeholder="0" onChange={handleInput} />
      <span>{typeText(type)}</span>
    </label>
  );
};

export default FilledTimeInput;
