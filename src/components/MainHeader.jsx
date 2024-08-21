import './MainHeader.css';
import '../index.css';
import ChevronLeft from '../assets/svg/chevron-left.svg?react';
import MainHeaderColor from '../const/MainHeaderColor';

const MainHeader = ({
  isLeftButtonEnable = true,
  rightText = '',
  onClickLeft,
  onClickRight,
  title = '제목',
  rightTextColor = MainHeaderColor.DEFAULT,
}) => {
  return (
    <div className="main-header">
      {isLeftButtonEnable ? (
        <button className="button left-button" onClick={onClickLeft}>
          <ChevronLeft />
        </button>
      ) : (
        <button className="button left-button" disabled></button>
      )}
      <h1>{title}</h1>
      <button className="button right-button" onClick={onClickRight}>
        <span className={rightTextColor}>{rightText}</span>
      </button>
    </div>
  );
};

export default MainHeader;
