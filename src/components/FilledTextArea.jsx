import './FilledTextArea.css';
import '../index.css';

const FilledTextArea = ({ placeholder = '입력칸', onTextChange }) => {
  const handleChange = (event) => {
    if (onTextChange) onTextChange(event.target.value);
  };

  return (
    <div className="filled-text-area">
      <textarea placeholder={placeholder} onChange={handleChange} />
    </div>
  );
};

export default FilledTextArea;
