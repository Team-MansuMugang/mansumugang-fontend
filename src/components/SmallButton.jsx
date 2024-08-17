import './SmallButton.css';
import '../index.css';

const SmallButton = ({ children }) => {
  return <button className="small-button">{children}</button>;
};

export default SmallButton;
