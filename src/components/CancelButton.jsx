import './CancelButton.css';
import '../index.css';

const CancelButton = ({ children }) => {
  return <button className="cancel-button">{children}삭제</button>;
};

export default CancelButton;
