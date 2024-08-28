import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BigButton from '../../components/BigButton';
import Input from '../../components/Input';
import InputWrapper from '../../components/InputWrapper';
import MainHeader from '../../components/MainHeader';
import './WithdrawPatientSignInPage.css';
import submitPatientSignin from '../../apis/api/submitPatientSignin';
import fetchPatientInfo from '../../apis/api/fetchPatientInfo';
import deletePatient from '../../apis/api/deletePatient';
import { UserNotFoundError, ProtectorLoginNotAllowedError } from '../../apis/utility/errors';

const WithdrawPatientSignInPage = () => {
  const navigate = useNavigate();
  const [patientInfo, setPatientInfo] = useState(null);
  const [isTabVisible, setIsTabVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUserDelete = async () => {
    if (!patientInfo) return;
    try {
      await deletePatient(patientInfo.patientId);
      navigate('/home');
    } catch (error) {
      toast.error('다시 로그인해주세요', { position: 'top-center' });
      console.error(error);
    }
  };

  const handleButtonClick = async () => {
    try {
      await submitPatientSignin({ username, password });
      const fetchedPatientInfo = await fetchPatientInfo();
      setPatientInfo(fetchedPatientInfo);
      setIsTabVisible(true);
    } catch (error) {
      console.error(error);
      if (error instanceof UserNotFoundError)
        toast.warn('아이디 또는 비밀번호가 일치하지 않습니다', { position: 'top-center' });
      if (error instanceof ProtectorLoginNotAllowedError)
        toast.warn('환자 아이디로 로그인해주세요', { position: 'top-center' });
    }
  };

  const handleCancelClick = () => {
    setIsTabVisible(false);
  };

  return (
    <>
      <MainHeader title="케어멤버 탈퇴하기" onClickLeft={() => navigate(-1)}></MainHeader>
      <div className="withdraw-patient-sign-in-page">
        <InputWrapper description="아이디">
          <Input
            placeholder={'아이디를 입력해주세요'}
            onInput={(event) => setUsername(event.target.value)}
          />
        </InputWrapper>

        <InputWrapper description="비밀번호">
          <Input
            placeholder={'비밀번호를 입력해주세요'}
            type="password"
            onInput={(event) => setPassword(event.target.value)}
          />
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
