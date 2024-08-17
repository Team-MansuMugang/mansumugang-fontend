import React, { useState } from 'react';
import './SchedulePage.css';
import Calendar from '../../components/Calendar';
import BorderContainer from '../../components/BorderContainer';
import ScheduleItem from '../../components/ScheduleItem';
import ScheduleListContainer from '../../components/ScheduleListContainer';
import SubTitle from '../../components/SubTitle';
import MedicineDetailCard from '../../components/MedicineDetailCard';
import HospitalDetailCard from '../../components/HospitalDetailCard';

const SchedulePage = () => {
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const [detailType, setDetailType] = useState('');

  const showOverlay = (type) => {
    setDetailType(type);
    setOverlayVisible(true);
  };

  const hideOverlay = (event) => {
    if (event.target.className.includes('schedule-page-overlay')) {
      setOverlayVisible(false);
      setDetailType('');
    }
  };

  return (
    <>
      <Calendar backUrl="/home" />
      <div className="schedule-page">
        <hr />
        <SubTitle showButton={false} title="8월 2일" />
        <BorderContainer>
          <ScheduleListContainer time={'오전 6:00'}>
            <ScheduleItem
              status={'hih'}
              title={'혈압약'}
              data={'동국대병원'}
              onClick={() => showOverlay('medicine')}
            />
            <ScheduleItem
              status={'hih'}
              title={'동국대병원'}
              data={'석장동'}
              onClick={() => showOverlay('hospital')}
            />
          </ScheduleListContainer>
        </BorderContainer>
      </div>
      <div
        className={`schedule-page-overlay ${isOverlayVisible ? 'show' : ''}`}
        onClick={hideOverlay}
      >
        {detailType === 'medicine' && <MedicineDetailCard editLink="/schedule/medicine-edit" />}
        {detailType === 'hospital' && <HospitalDetailCard editLink="/schedule/hospital-edit" />}
      </div>
    </>
  );
};

export default SchedulePage;
