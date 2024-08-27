import './BigButton.css';
import '../index.css';

const BigButton = ({ children, disabled = false, onClick }) => {
  return (
    <button className="big-button" disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};

export default BigButton;
