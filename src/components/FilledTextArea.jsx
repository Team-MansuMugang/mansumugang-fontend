import './FilledTextArea.css';
import '../index.css';

const FilledTextArea = ({ init = '', placeholder = '입력칸', onTextChange }) => {
  const handleChange = (event) => {
    if (onTextChange) onTextChange(event.target.value);
  };

  return (
    <div className="filled-text-area">
      <textarea placeholder={placeholder} value={init} onChange={handleChange} />
    </div>
  );
};

export default FilledTextArea;
