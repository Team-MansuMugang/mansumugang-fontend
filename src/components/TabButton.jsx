import './TabButton.css';
import '../index.css';

const TabButton = ({ children, disabled = false }) => {
  return (
    <button className="tab-button" disabled={disabled}>
      {children}
    </button>
  );
};

export default TabButton;
