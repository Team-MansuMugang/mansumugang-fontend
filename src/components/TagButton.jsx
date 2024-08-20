import './TagButton.css';
import '../index.css';

const TabButton = ({ children, disabled = false, onclick }) => {
  return (
    <button className="tag-button" disabled={disabled} onClick={onclick}>
      {children}
    </button>
  );
};

export default TabButton;
