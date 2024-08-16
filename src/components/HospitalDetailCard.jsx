import { Link } from 'react-router-dom';
import './HospitalDetailCard.css';
import '../index.css';
import ScheduleItem from './ScheduleItem';
import DaySelector from './DaySelector';
import FilledDualInfo from './FilledDualInfo';

const HospitalDetailCard = ({
  hospitalName,
  hospitalAddress,
  hospitalDescription,
  hospitalVisitingTime,
  hospitalVisitingDate,
}) => {
  return (
    <div className="hospital-detail-card">
      <Link to="/">편집</Link>
      <div className="top-container">
        <span>{hospitalName}</span>
        <span>
          {hospitalVisitingDate} · {hospitalVisitingTime}
        </span>
      </div>
      <FilledDualInfo title={hospitalAddress} data={hospitalDescription} />
    </div>
  );
};

export default HospitalDetailCard;
