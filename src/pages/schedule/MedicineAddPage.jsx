import { useNavigate } from 'react-router-dom';

// Stylesheets
import './MedicineEditPage.css';
import '../../index.css';

// Components
import MainHeader from '../../components/MainHeader';
import ImageUploader from '../../components/ImageUploader';
import FilledDualInput from '../../components/FilledDualInput';
import FilledTextArea from '../../components/FilledTextArea';
import DaySelector from '../../components/DaySelector';
import FillMeridiemToggle from '../../components/FillMeridiemToggle';
import FilledTimeInput from '../../components/FilledTimeInput';
import AddedTimeItem from '../../components/AddedTimeItem';
import BigButton from '../../components/BigButton';
import CheckButton from '../../components/CheckButton';
import FilledDateInput from '../../components/FilledDateInput';

// API
import addMedicine from '../../apis/api/addMedicine';

const MedicineAddPage = () => {
  const navigate = useNavigate();

  const handleDrugFormSubmit = () => {
    // 약 추가 요청
    addMedicine({
      patientId: '',
      medicineName: '',
      hospitalName: '',
      medicineDescription: '',
      medicineIntakeTimes: [],
      medicineIntakeDays: [],
      medicineIntakeStopDay: '',
    });
    navigate(-1);
  };

  return (
    <div className="medicine-edit-page">
      <MainHeader title="약 추가 페이지" onClickLeft={() => navigate(-1)} />
      <div className="contents">
        <div className="top-container">
          <ImageUploader type="drugs" onImageUpload={(image) => console.log(image)} />
          <FilledDualInput placeholder={['약 이름', '병원 이름']} />
        </div>
        <FilledTextArea placeholder="메모" />

        <h2>요일 반복</h2>
        <DaySelector />

        <h2>반복 종료 날짜</h2>
        <div className="date-input-container">
          <FilledDateInput type="years" />
          <FilledDateInput type="months" />
          <FilledDateInput type="days" />
        </div>

        <h2>시간</h2>
        <div className="time-input-container">
          <FillMeridiemToggle />
          <FilledTimeInput type="hours" />
          <FilledTimeInput type="minutes" />
          <CheckButton>추가</CheckButton>
        </div>
        <AddedTimeItem />
        <AddedTimeItem />
      </div>
      <div className="big-button-wrap">
        <BigButton onClick={handleDrugFormSubmit}>약 추가하기</BigButton>
      </div>
    </div>
  );
};

export default MedicineAddPage;
