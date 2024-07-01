import './BigButton.css';
import '../index.css';

const BigButton = ({ children, disabled = false }) => {
  return (
    <button className="big-button" disabled={disabled}>
      {children}
    </button>
  );
};

export default BigButton;
