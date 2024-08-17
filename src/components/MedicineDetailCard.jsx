import { Link } from 'react-router-dom';
import './MedicineDetailCard.css';
import '../index.css';
import ScheduleItem from './ScheduleItem';
import DaySelector from './DaySelector';
import FilledDualInfo from './FilledDualInfo';
import DrugsIcon from '../assets/svg/drugs.svg?react';

const MedicineDetailCard = ({
  medicineName,
  hospitalName,
  medicineDescription,
  medicineIntakeTime,
  medicineIntakeDays,
  medicineImage,
  status,
  editLink,
}) => {
  return (
    <div className="medicine-detail-card">
      <Link to={editLink}>편집</Link>
      <div className="top-container">
        {medicineImage === 'http://minnnisu.iptime.org/mm/images/null' ? (
          <div className="no-image-placeholder">
            <DrugsIcon />
          </div>
        ) : (
          <img src={medicineImage} alt={medicineName} />
        )}
        <ScheduleItem title={medicineName} data={medicineIntakeTime} status={status} />
      </div>
      <DaySelector initSelectedDays={medicineIntakeDays} viewOnly={true} />
      <FilledDualInfo title={hospitalName} data={medicineDescription} />
    </div>
  );
};

export default MedicineDetailCard;
