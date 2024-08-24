import '../index.css';
import './PrescriptionSelectionButton.css';

const PrescriptionSelectionButton = ({ children, onClick }) => {
  return (
    <button className="prescription-selection-button" onClick={onClick}>
      {children}
    </button>
  );
};

export default PrescriptionSelectionButton;
