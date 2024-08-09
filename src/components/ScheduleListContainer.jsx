import PropTypes from 'prop-types';
import './ScheduleListContainer.css';

const ScheduleListContainer = ({ time, children }) => {
  return (
    <div className="schedule-list-container">
      <div className="schedule-time">{time}</div>
      <div className="schedule-items">{children}</div>
    </div>
  );
};

ScheduleListContainer.propTypes = {
  time: PropTypes.string.isRequired,
  schedules: PropTypes.arrayOf(
    PropTypes.shape({
      status: PropTypes.oneOf(['checked', 'unchecked']).isRequired,
      title: PropTypes.string.isRequired,
      data: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default ScheduleListContainer;
