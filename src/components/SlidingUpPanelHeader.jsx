import './SlidingUpPanel.css';
import CloseIcon from '../assets/svg/close-big.svg?react';
import './SlidingUpPanelHeader.css';

const SlidingUpPanelHeader = ({ title, onClose }) => {
  return (
    <div className="slide-up-panel-header">
      <div className="header-left">
        <button disabled className="item-disable-button"></button>
      </div>
      <div className="header-center">{title}</div>
      <div className="header-right" onClick={() => onClose()}>
        <CloseIcon />
      </div>
    </div>
  );
};

export default SlidingUpPanelHeader;
