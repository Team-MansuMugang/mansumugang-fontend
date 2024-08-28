import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainHeader from '../../components/MainHeader';
import BigButton from '../../components/BigButton';
import './WithdrawPage.css';
import '../../index.css';
import { ExpiredAccessTokenError, NotValidAccessTokenError } from '../../apis/utility/errors';
import fetchMyInfo from '../../apis/api/fetchMyInfo';
import deleteGuardian from '../../apis/api/deleteGuardian';

const WithdrawPage = () => {
  const [myInfo, setMyInfo] = useState(null);
  const [isTabVisible, setIsTabVisible] = useState(false);
  const navigate = useNavigate();

  const handleUserDelete = async () => {
    try {
      await deleteGuardian(myInfo.protectorId);
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
      }
    }
  };

  const handleButtonClick = () => {
    setIsTabVisible(true);
  };

  const handleCancelClick = () => {
    setIsTabVisible(false);
  };

  const fetchAndSetMyInfo = async () => {
    try {
      const myInfo = await fetchMyInfo();
      setMyInfo(myInfo);
    } catch (error) {
      if (error instanceof ExpiredAccessTokenError) {
        try {
          await renewRefreshToken();
          fetchAndSetMyInfo();
        } catch (error) {
          navigate('/');
        }
      } else if (error instanceof NotValidAccessTokenError) {
        navigate('/');
      } else {
      }
    }
  };

  fetchAndSetMyInfo();

  return (
    <>
      <MainHeader title="회원 탈퇴하기" onClickLeft={() => navigate(-1)}></MainHeader>
      <div className="withdraw-page">
        <p>
          보호자님께서 서비스에서 탈퇴를 원하시는 경우,{' '}
          <span className="bold">
            등록된 케어멤버 계정를 탈퇴를 모두 진행하신 후 보호자 탈퇴가 진행됩니다
          </span>{' '}
          먼저 연동된 모든 케어 멤버 계정을 탈퇴 부탁드립니다.
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
          <BigButton disabled={false} onClick={handleButtonClick}>
            탈퇴하기
          </BigButton>
        </div>
      </div>

      {isTabVisible && (
        <div className="withdraw-page-overlay">
          <div className="withdraw-tab">
            <h3>정말로 탈퇴하시겠습니까?</h3>
            <p>보호자의 정보가 모두 삭제됩니다</p>
            <BigButton onClick={handleUserDelete}>탈퇴하기</BigButton>
            <BigButton onClick={handleCancelClick}>취소</BigButton>
          </div>
        </div>
      )}
    </>
  );
};

export default WithdrawPage;
