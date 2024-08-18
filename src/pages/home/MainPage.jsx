// React 및 Router 관련
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// CSS 스타일링
import './MainPage.css';

// 사용자 정의 컴포넌트
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
import FloatingActionButton from '../../components/FloatingActionButton';

// API 호출
import fetchPatientList from '../../apis/api/fetchPatientList';
import medicineInfoRetrieval from '../../apis/api/medicineInfoRetrieval';
import renewRefreshToken from '../../apis/api/renewRefreshToken';
import medicineDetailRetrieval from '../../apis/api/medicineDetailRetrieval';
import hospitalDetailRetrieval from '../../apis/api/hospitalDetailRetrieval';

// 에러 처리
import { NotValidAccessTokenError, ExpiredAccessTokenError } from '../../apis/utility/errors';

// 아이콘
import DrugsIcon from '../../assets/svg/drugs.svg?react';
import LocalHospitalIcon from '../../assets/svg/local-hospital.svg?react';

const MainPage = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(0);
  const [medicineSchedules, setMedicineSchedules] = useState([]);
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const [detailData, setDetailData] = useState({});
  const [detailType, setDetailType] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAndSetPatientList = async () => {
      try {
        const patientList = await fetchPatientList();
        setPatients(patientList);
      } catch (error) {
        if (error instanceof ExpiredAccessTokenError) {
          try {
            await renewRefreshToken();
            fetchAndSetPatientList();
          } catch (error) {
            navigate('/');
          }
        } else if (error instanceof NotValidAccessTokenError) navigate('/');
        else console.error(error);
      }
    };

    fetchAndSetPatientList();
  }, []);

  useEffect(() => {
    if (patients.length > 0) handlePatientSelection(0);
  }, [patients]);

  const handlePatientSelection = async (patientIndex) => {
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

  const generateScheduleItems = (schedule) => {
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
              displayDetailOverlay('medicine', medicine.medicineId, schedule.time, medicine.status)
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
            displayDetailOverlay(
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

  const fetchAndSetDetailData = async (type, id, thisTime, thisStatus) => {
    try {
      console.log('id:', id);
      let result;
      if (type === 'medicine') result = await medicineDetailRetrieval(id);
      if (type === 'hospital') result = await hospitalDetailRetrieval(id);
      console.log('result:', result);
      setDetailData({ ...result, thisTime, thisStatus });
    } catch (error) {
      if (error instanceof ExpiredAccessTokenError) {
        try {
          await renewRefreshToken();
          fetchAndSetDetailData(type, id, thisTime, thisStatus);
        } catch (error) {
          navigate('/');
        }
      } else if (error instanceof NotValidAccessTokenError) navigate('/');
      else console.error(error);
    }
  };

  const displayDetailOverlay = (type, Id, thisTime, thisStatus) => {
    setDetailType(type);
    setOverlayVisible(true);
    fetchAndSetDetailData(type, Id, thisTime, thisStatus);
  };

  const hideDetailOverlay = (event) => {
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
        onSelect={handlePatientSelection}
      />

      <SubTitle title="일정" linkTo={`/schedule/${patients[selectedPatient]?.patientId}`} />
      <BorderContainer>
        {medicineSchedules.length > 0 ? (
          medicineSchedules.map((schedule) => (
            <ScheduleListContainer
              key={schedule.time}
              time={`${schedule.time.split(':')[0] < 12 ? '오전' : '오후'} ${schedule.time.split(':')[0] % 12 || 12}시 ${schedule.time.split(':')[1]}분`}
            >
              {generateScheduleItems(schedule)}
            </ScheduleListContainer>
          ))
        ) : (
          <p>오늘 일정이 없습니다.</p>
        )}
      </BorderContainer>

      <SubTitle title="현재 위치" showButton={false} />
      <div style={{ backgroundColor: 'red', width: '100%', height: '100px' }}>구현중</div>

      <NavBar activeTab="홈" />
      <FloatingActionButton
        title={`${patients[selectedPatient]?.patientName}님의 일정에`}
        items={[
          {
            title: '약 일정 추가하기',
            icon: <DrugsIcon />,
            url: `/schedule/medicine-add/${patients[selectedPatient]?.patientId}`,
          },
          {
            title: '병원 일정 추가하기',
            icon: <LocalHospitalIcon />,
            url: `/schedule/hospital-add/${patients[selectedPatient]?.patientId}`,
          },
        ]}
      />
      <div
        className={`schedule-page-overlay ${isOverlayVisible ? 'show' : ''}`}
        onClick={hideDetailOverlay}
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
