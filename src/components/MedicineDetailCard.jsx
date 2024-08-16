import { Link } from 'react-router-dom';
import './MedicineDetailCard.css';
import '../index.css';
import ScheduleItem from './ScheduleItem';
import DaySelector from './DaySelector';
import FilledDualInfo from './FilledDualInfo';

const MedicineDetailCard = ({
  medicineName,
  hospitalName,
  medicineDescription,
  medicineIntakeTime,
  medicineIntakeDays,
  status,
}) => {
  return (
    <div className="medicine-detail-card">
      <Link to="/">편집</Link>
      <div className="top-container">
        {
          // TODO: 이미지 반영하기
        }
        <img src="https://picsum.photos/200" alt="" />
        <ScheduleItem title={medicineName} data={medicineIntakeTime} status={status} />
      </div>
      <DaySelector initSelectedDays={medicineIntakeDays} viewOnly={true} />
      <FilledDualInfo title={hospitalName} data={medicineDescription} />
    </div>
  );
};

export default MedicineDetailCard;
