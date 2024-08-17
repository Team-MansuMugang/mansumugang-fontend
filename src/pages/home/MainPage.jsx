import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.css';
import SubTitle from '../../components/SubTitle';
import SmallVoiceMessageItem from '../../components/SmallVoiceMessageItem';
import RowScrollContainer from '../../components/RowScrollContainer';
import NavBar from '../../components/NavBar';
import BorderContainer from '../../components/BorderContainer';
import ScheduleListContainer from '../../components/ScheduleListContainer';
import ScheduleItem from '../../components/ScheduleItem';
import ItemSelector from '../../components/ItemSelector';
import MedicineDetailCard from '../../components/MedicineDetailCard';
import HospitalDetailCard from '../../components/HospitalDetailCard';
import fetchPatientList from '../../apis/api/fetchPatientList';
import medicineInfoRetrieval from '../../apis/api/medicineInfoRetrieval';
import renewRefreshToken from '../../apis/api/renewRefreshToken';
import medicineDetailRetrieval from '../../apis/api/medicineDetailRetrieval';
import hospitalDetailRetrieval from '../../apis/api/hospitalDetailRetrieval';
import FloatingActionButton from '../../components/FloatingActionButton';
import { NotValidAccessTokenError, ExpiredAccessTokenError } from '../../apis/utility/errors';

const MainPage = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(0);
  const [medicineSchedules, setMedicineSchedules] = useState([]);
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const [detailData, setDetailData] = useState({});
  const [detailType, setDetailType] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadPatients = async () => {
      try {
        const patientList = await fetchPatientList();
        setPatients(patientList);
      } catch (error) {
        if (error instanceof ExpiredAccessTokenError) {
          await renewRefreshToken();
          loadPatients();
        } else if (error instanceof NotValidAccessTokenError) navigate('/');
        else console.error(error);
      }
    };

    loadPatients();
  }, []);

  useEffect(() => {
    if (patients.length > 0) handleSelectPatient(0);
  }, [patients]);

  const handleSelectPatient = async (patientIndex) => {
    if (patientIndex < 0 || patientIndex >= patients.length) return;

    const selectedPatientId = patients[patientIndex].patientId;
    setSelectedPatient(patientIndex);

    try {
      const result = await medicineInfoRetrieval({ patientId: selectedPatientId });
      setMedicineSchedules(result.medicineSchedules);
    } catch (error) {
      console.error('Failed to retrieve medicine schedule:', error);
    }
  };

  const renderScheduleItems = (schedule) => {
    const items = [];

    if (schedule.medicines.length > 0) {
      schedule.medicines.forEach((medicine) => {
        items.push(
          <ScheduleItem
            key={medicine.medicineId}
            status={medicine.status === 'TAKEN' ? 'checked' : 'unchecked'}
            title={medicine.medicineName}
            data={medicine.hospitalName || ''}
            onClick={() =>
              showOverlay('medicine', medicine.medicineId, schedule.time, medicine.status)
            }
          />,
        );
      });
    }

    if (schedule.hospital) {
      items.push(
        <ScheduleItem
          key={schedule.hospital.hospitalId}
          status={schedule.hospital.status ? 'checked' : 'unchecked'}
          title={schedule.hospital.hospitalName || '병원'}
          data={schedule.hospital.hospitalAddress || ''}
          onClick={() =>
            showOverlay(
              'hospital',
              schedule.hospital.hospitalId,
              schedule.time,
              schedule.hospital.status,
            )
          }
        />,
      );
    }

    return items;
  };

  const medicineDetail = async (type, id, thisTime, thisStatus) => {
    try {
      console.log('id:', id);
      let result;
      if (type === 'medicine') result = await medicineDetailRetrieval(id);
      if (type === 'hospital') result = await hospitalDetailRetrieval(id);
      console.log('result:', result);
      setDetailData({ ...result, thisTime, thisStatus });
    } catch (error) {
      if (error instanceof ExpiredAccessTokenError) {
        await renewRefreshToken();
        medicineDetail(type, id, thisTime, thisStatus);
      } else if (error instanceof NotValidAccessTokenError) navigate('/');
      else console.error(error);
    }
  };

  const showOverlay = (type, Id, thisTime, thisStatus) => {
    setDetailType(type);
    setOverlayVisible(true);
    medicineDetail(type, Id, thisTime, thisStatus);
  };

  const hideOverlay = (event) => {
    if (event.target.className.includes('schedule-page-overlay')) {
      setOverlayVisible(false);
      setDetailType('');
    }
  };

  return (
    <div className="main-page">
      <h1>홈</h1>

      <SubTitle title="음성 메세지" linkTo="/voice-message" />

      <RowScrollContainer>
        <SmallVoiceMessageItem
          profileImage={'https://picsum.photos/200/300'}
          name={'가나다라마바사아자차카타파하'}
          time={'30분 전'}
          onClick={() => navigate('/voice-message/detail')}
        />
      </RowScrollContainer>

      <hr />

      <ItemSelector
        items={patients.map((patient) => patient.patientName)}
        onSelect={handleSelectPatient}
      />

      <SubTitle title="일정" linkTo={`/schedule/${patients[selectedPatient]?.patientId}`} />
      <BorderContainer>
        {medicineSchedules.map((schedule) => (
          <ScheduleListContainer key={schedule.time} time={schedule.time}>
            {renderScheduleItems(schedule)}
          </ScheduleListContainer>
        ))}
      </BorderContainer>

      <SubTitle title="현재 위치" showButton={false} />
      <div style={{ backgroundColor: 'red', width: '100%', height: '100px' }}>구현중</div>

      <NavBar activeTab="홈" />
      <FloatingActionButton
        items={[
          { title: '약 일정 추가하기', url: '/schedule/medicine-add' },
          { title: '병원 일정 추가하기', url: '/schedule/hospital-add' },
        ]}
      />
      <div
        className={`schedule-page-overlay ${isOverlayVisible ? 'show' : ''}`}
        onClick={hideOverlay}
      >
        {detailType === 'medicine' && (
          <MedicineDetailCard
            editLink={`/schedule/medicine-edit/${detailData.patientId}/${detailData.medicineId}`}
            medicineName={detailData.medicineName}
            hospitalName={detailData.hospitalName}
            medicineDescription={detailData.medicineDescription}
            medicineIntakeTime={detailData.thisTime}
            medicineIntakeDays={detailData.medicineIntakeDays}
            medicineImage={detailData.medicineImage}
            status={detailData.thisStatus === 'TAKEN' ? 'checked' : 'unchecked'}
          />
        )}
        {detailType === 'hospital' && (
          <HospitalDetailCard
            editLink={`/schedule/hospital-edit/${detailData.patientId}/${detailData.hospitalId}`}
            hospitalName={detailData.hospitalName}
            hospitalAddress={detailData.hospitalAddress}
            hospitalDescription={detailData.medicineDescription}
            hospitalVisitingDate={new Date(detailData.hospitalVisitingTime).toLocaleDateString(
              'ko-KR',
              { month: 'long', day: 'numeric' },
            )}
            hospitalVisitingTime={detailData.thisTime}
          />
        )}
      </div>
    </div>
  );
};

export default MainPage;
