import './SecessionBigButton.css';
import '../index.css';

const SecessionBigButton = ({ children, disabled = false, onClick }) => {
  return (
    <button className="secession-big-button" disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};

export default SecessionBigButton;
