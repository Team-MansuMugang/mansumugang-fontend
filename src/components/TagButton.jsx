import './TagButton.css';
import '../index.css';

const TabButton = ({ children, disabled = false }) => {
  return (
    <button className="tag-button" disabled={disabled}>
      {children}
    </button>
  );
};

export default TabButton;
