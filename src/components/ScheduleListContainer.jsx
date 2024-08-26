import './ScheduleListContainer.css';

const ScheduleListContainer = ({ time, children }) => {
  return (
    <div className="schedule-list-container">
      <div className="schedule-time">{time}</div>
      <div className="schedule-items">{children}</div>
    </div>
  );
};

export default ScheduleListContainer;
