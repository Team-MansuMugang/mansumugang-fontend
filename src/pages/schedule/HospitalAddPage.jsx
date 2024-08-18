import { useNavigate } from 'react-router-dom';
import './HospitalEditPage.css';
import '../../index.css';
import MainHeader from '../../components/MainHeader';
import FilledDualInput from '../../components/FilledDualInput';
import FilledTextArea from '../../components/FilledTextArea';
import FillMeridiemToggle from '../../components/FillMeridiemToggle';
import FilledTimeInput from '../../components/FilledTimeInput';
import BigButton from '../../components/BigButton';
import FilledDateInput from '../../components/FilledDateInput';

const HospitalAddPage = () => {
  const navigate = useNavigate();
  return (
    <div className="hospital-edit-page">
      <MainHeader title="병원 일정 추가 페이지" onClickLeft={() => navigate(-1)} />
      <div className="contents">
        <div className="top-container">
          <FilledDualInput placeholder={['병원 이름', '병원 주소']} />
        </div>
        <FilledTextArea placeholder="메모" />

        <h2>병원 방문일</h2>
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
        </div>
      </div>
      <div className="big-button-wrap">
        <BigButton>병원 일정 추가하기</BigButton>
      </div>
    </div>
  );
};

export default HospitalAddPage;
