import './TagButton.css';
import '../index.css';

const TagButton = ({ children, selected = false, onClick }) => {
  return (
    <button className="tag-button" disabled={selected} onClick={onClick}>
      {children}
    </button>
  );
};

export default TagButton;
