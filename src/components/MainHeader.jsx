import './MainHeader.css';
import '../index.css';
import ChevronLeft from '../assets/svg/chevron-left.svg?react';

const MainHeader = ({ rightText = '', onClickLeft, onClickRight, title = '제목' }) => {
  return (
    <div className="main-header">
      <button className="button left-button" onClick={onClickLeft}>
        <ChevronLeft />
      </button>
      <h1>{title}</h1>
      <button className="button right-button" onClick={onClickRight}>
        <span>{rightText}</span>
      </button>
    </div>
  );
};

export default MainHeader;
