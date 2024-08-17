import { Link } from 'react-router-dom';
import './HospitalDetailCard.css';
import '../index.css';
import FilledDualInfo from './FilledDualInfo';

const HospitalDetailCard = ({
  hospitalName,
  hospitalAddress,
  hospitalDescription,
  hospitalVisitingTime,
  hospitalVisitingDate,
  editLink,
}) => {
  return (
    <div className="hospital-detail-card">
      <Link to={editLink}>편집</Link>
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
