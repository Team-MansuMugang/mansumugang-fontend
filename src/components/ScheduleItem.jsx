import PropTypes from 'prop-types';
import './ScheduleItem.css';
import CheckCircle from '../assets/svg/check-circle-outline.svg?react';

const ScheduleItem = ({ status, title, data }) => {
  return (
    <div className="schedule-item">
      <div className={`schedule-status schedule-status-${status}`}>
        {status === 'checked' ? <CheckCircle /> : <CheckCircle />}
      </div>
      <div className="schedule-text">
        <div className="schedule-title">{title}</div>
        <div className="schedule-data">{data}</div>
      </div>
    </div>
  );
};

ScheduleItem.propTypes = {
  status: PropTypes.oneOf(['checked', 'unchecked']).isRequired,
  title: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
};

export default ScheduleItem;
