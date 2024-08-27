import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BigButton from '../../components/BigButton';
import Input from '../../components/Input';
import InputWrapper from '../../components/InputWrapper';
import MainHeader from '../../components/MainHeader';
import './WithdrawPatientSignInPage.css';
import fetchPatientInfo from '../../apis/api/fetchPatientInfo';
import deletePatient from '../../apis/api/deleteGuardian';
import { ExpiredAccessTokenError, NotValidAccessTokenError } from '../../apis/utility/errors';

const WithdrawPatientSignInPage = () => {
  const navigate = useNavigate();
  const [patientInfo, setPatientInfo] = useState(null);
  const [isTabVisible, setIsTabVisible] = useState(false);

  useEffect(() => {
    fetchAndSetPatientInfo();
  }, []);

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

  const handleButtonClick = () => {
    setIsTabVisible(true);
  };

  const handleCancelClick = () => {
    setIsTabVisible(false);
  };

  return (
    <>
      <MainHeader title="케어멤버 탈퇴하기" onClickLeft={() => navigate(-1)}></MainHeader>
      <div className="withdraw-patient-sign-in-page">
        <InputWrapper description="아이디">
          <Input placeholder={'아이디를 입력해주세요'}></Input>
        </InputWrapper>
        <InputWrapper description="비밀번호">
          <Input placeholder={'비밀번호를 입력해주세요'}></Input>
        </InputWrapper>
        <BigButton onClick={handleButtonClick}>탈퇴하기</BigButton>
      </div>
      {isTabVisible && (
        <div className="withdraw-patient-sign-in-page-overlay">
          <div className="withdraw-tab">
            <h3>정말로 탈퇴하시겠습니까?</h3>
            <p>케어멤버의 계정 탈퇴를 위한 로그인을 진행합니다</p>
            <BigButton onClick={handleUserDelete}>탈퇴하기</BigButton>
            <BigButton onClick={handleCancelClick}>취소</BigButton>
          </div>
        </div>
      )}
    </>
  );
};

export default WithdrawPatientSignInPage;
