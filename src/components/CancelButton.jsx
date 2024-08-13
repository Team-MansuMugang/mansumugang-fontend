import './CancelButton.css';
import '../index.css';

const CancelButton = ({ children }) => {
  return <button className="cancel-button">{children}</button>;
};

export default CancelButton;
