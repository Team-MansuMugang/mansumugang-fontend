import './SubButton.css';
import '../index.css';

const SubButton = ({ children, onClick }) => {
  return (
    <button className="sub-button" onClick={onClick}>
      {children}
    </button>
  );
};

export default SubButton;
