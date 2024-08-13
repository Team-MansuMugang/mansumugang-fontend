import { useNavigate } from 'react-router-dom';
import './SubText.css';
import '../index.css';
import ChevronRightIcon from '../assets/svg/chevron-right.svg?react';

const SubText = ({ text, navigateTo }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(navigateTo);
  };

  return (
    <div className="subtext-container" onClick={handleClick}>
      <div className="subtext">{text}</div>
      <ChevronRightIcon className="subtext-icon" />
    </div>
  );
};

export default SubText;
