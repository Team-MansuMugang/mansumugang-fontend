import './SubTitle.css';
import '../index.css';
import { useNavigate } from 'react-router-dom';

const SubTitle = ({ title = '제목', showButton = true, buttonName = '더보기', linkTo }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (linkTo) {
      navigate(linkTo);
    }
  };

  return (
    <div className="sub-title">
      <h2>{title}</h2>
      {showButton && <button onClick={handleClick}>{buttonName}</button>}
    </div>
  );
};

export default SubTitle;
