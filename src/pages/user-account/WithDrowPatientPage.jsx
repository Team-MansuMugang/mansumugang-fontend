import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainHeader from '../../components/MainHeader';
import SecessionBigButton from '../../components/SecessionBigButton';
import './WithDrowPatientPage.css';
import '../../index.css';
import { ExpiredAccessTokenError, NotValidAccessTokenError } from '../../apis/utility/errors';
import fetchPatientInfo from '../../apis/api/fetchPatientInfo';
import deletePatient from '../../apis/api/deleteGuardian';

const WithDrowPatientPage = () => {
  const [patientInfo, setPatientInfo] = useState(null);
  const [isTabVisible, setIsTabVisible] = useState(false);
  const navigate = useNavigate();

  const handleUserDelete = async () => {
    if (!patientInfo) return; // patientInfo가 로드되지 않았을 경우 빠져나감
    try {
      await deletePatient(patientInfo.patientId);
      navigate('/');
    } catch (error) {
      if (error instanceof ExpiredAccessTokenError) {
        try {
          await renewRefreshToken();
          handleUserDelete(); // API 함수 재실행 (재귀함수)
        } catch (error) {
          navigate('/'); // 엑세스토큰 재발급 실패했을때
        }
      } else if (error instanceof NotValidAccessTokenError) {
        navigate('/'); // 아예 존재하지 않던 엑세스토큰일때
      } else {
        console.error(error);
      }
    }
  };

  const handleButtonClick = () => {
    setIsTabVisible(true);
  };

  const handleCancelClick = () => {
    setIsTabVisible(false);
  };

  const fetchAndSetPatientInfo = async () => {
    try {
      const patientInfo = await fetchPatientInfo();
      setPatientInfo(patientInfo);
    } catch (error) {
      if (error instanceof ExpiredAccessTokenError) {
        try {
          await renewRefreshToken();
          fetchAndSetPatientInfo();
        } catch (error) {
          navigate('/');
        }
      } else if (error instanceof NotValidAccessTokenError) {
        navigate('/');
      } else {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    fetchAndSetPatientInfo();
  }, []);

  console.log(patientInfo?.patientId); // patientInfo가 존재할 때만 patientId를 로그 출력

  return (
    <>
      <MainHeader title="케어멤버 탈퇴하기" onClickLeft={() => navigate(-1)}></MainHeader>
      <div className="with-drow-patient-page">
        <p>
          케어맴버님께서 서비스에서 탈퇴할 경우,{' '}
          <span className="bold">보호자와의 연결이 끊겨 현재 이용하시던 서비스는</span> 이용하지
          못하게 됩니다.
        </p>
        <p>
          보호자와 케어 멤버의 회원 탈퇴가 완료되면,{' '}
          <span className="bold">
            보호자와 케어 멤버의 개인정보{' '}
            <span className="small">(예: 이름, 연락처, 이메일 등)</span> 뿐만 아니라, 이전에 기록된
            모든 케어 멤버들의 관련 기록들{' '}
            <span className="small">(알림 전송 정보, 보호일지, 음성 메시지 등)</span> 이 영구적으로
            삭제됩니다.
          </span>
        </p>
        <p>
          삭제된 정보는 어떠한 경우에도 복구할 수 없으므로, 중요한 정보는 탈퇴 전에 반드시 별도로
          보관해주시길 바랍니다.
        </p>
        <div className="secession-button">
          <SecessionBigButton disabled={!patientInfo} onClick={handleButtonClick}>
            탈퇴하기
          </SecessionBigButton>
        </div>
      </div>

      {isTabVisible && (
        <div className="overlay">
          <div className="with-drow-tab">
            <h3>정말로 탈퇴하시겠습니까?</h3>
            <p>케어멤버의 정보가 모두 삭제됩니다</p>
            <SecessionBigButton onClick={handleUserDelete}>탈퇴하기</SecessionBigButton>
            <SecessionBigButton onClick={handleCancelClick} variant="white-black">
              취소
            </SecessionBigButton>
          </div>
        </div>
      )}
    </>
  );
};

export default WithDrowPatientPage;
