import './SecessionBigButton.css';
import '../index.css';

const SecessionBigButton = ({ children, onClick, variant = 'default' }) => {
  const buttonClass = `secession-big-button ${variant === 'white-black' ? 'white-black' : ''}`;

  return (
    <button className={buttonClass} onClick={onClick}>
      {children}
    </button>
  );
};

export default SecessionBigButton;
