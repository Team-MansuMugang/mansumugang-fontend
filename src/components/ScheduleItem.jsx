import './ScheduleItem.css';
import CheckCircle from '../assets/svg/check-circle-outline.svg?react';

const ScheduleItem = ({ status, title, data, onClick }) => {
  return (
    <div className="schedule-item" onClick={onClick}>
      <CheckCircle className={`status-${status}`} />
      <div className="schedule-title">{title}</div>
      <div className="schedule-data">{data}</div>
    </div>
  );
};

export default ScheduleItem;
