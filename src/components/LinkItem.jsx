import { useNavigate } from 'react-router-dom';
import './LinkItem.css';
import '../index.css';
import ChevronRightIcon from '../assets/svg/chevron-right.svg?react';

const LinkItem = ({ text, navigateTo }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(navigateTo);
  };

  return (
    <div className="link-item" onClick={handleClick}>
      <div className="subtext">{text}</div>
      <ChevronRightIcon className="subtext-icon" />
    </div>
  );
};

export default LinkItem;
