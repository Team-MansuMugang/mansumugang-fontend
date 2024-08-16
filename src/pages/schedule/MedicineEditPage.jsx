import './MedicineEditPage.css';
import '../../index.css';
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

const MedicineEditPage = () => {
  return (
    <div className="medicine-edit-page">
      <MainHeader title="약 수정 페이지" rightText="삭제" />
      <div className="contents">
        <div className="top-container">
          <ImageUploader type="drugs" />
          <FilledDualInput placeholder={['약 이름', '병원 이름']} />
        </div>
        <FilledTextArea placeholder="메모" />

        <h2>요일 반복</h2>
        <DaySelector />

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
        <BigButton>약 수정하기</BigButton>
      </div>
    </div>
  );
};

export default MedicineEditPage;
