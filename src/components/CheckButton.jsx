import './CheckButton.css';
import '../index.css';

const CheckButton = ({ children, disabled = false, onClick }) => {
  return (
    <button className="check-button" disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};

export default CheckButton;
