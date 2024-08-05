import './SubTitle.css';
import '../index.css';

const SubTitle = ({ onClick, title = '제목', showButton = 'true', buttonName = '더보기' }) => {
  return (
    <div className="sub-title">
      <h2>{title}</h2>
      {showButton && <button onClick={onClick}>{buttonName}</button>}
    </div>
  );
};

export default SubTitle;
