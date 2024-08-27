import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainHeader from '../../components/MainHeader';
import BigButton from '../../components/BigButton';
import './WithdrawPatientPage.css';
import '../../index.css';

const WithdrawPatientPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <MainHeader title="케어멤버 탈퇴하기" onClickLeft={() => navigate(-1)}></MainHeader>
      <div className="withdraw-patient-page">
        <p>
          케어맴버님께서 서비스에서 탈퇴할 경우,{' '}
          <span className="bold">보호자와의 연결이 끊기게 됩니다.</span>
        </p>
        <p>
          케어 멤버의 회원 탈퇴가 완료되면,{' '}
          <span className="bold">
            케어 멤버의 개인정보 <span className="small">(예: 이름, 연락처, 이메일 등)</span> 뿐만
            아니라, 이전에 기록된 모든 케어 멤버들의 관련 기록들{' '}
            <span className="small">(알림 전송 정보, 보호일지, 음성 메시지 등)</span> 이 영구적으로
            삭제됩니다.
          </span>
        </p>
        <p>
          삭제된 정보는 어떠한 경우에도 복구할 수 없으므로, 중요한 정보는 탈퇴 전에 반드시 별도로
          보관해주시길 바랍니다.
        </p>
        <div className="secession-button">
          <BigButton onClick={() => navigate('/account/withdraw-patient/sign-in')}>
            로그인 후 탈퇴하기
          </BigButton>
        </div>
      </div>
    </>
  );
};

export default WithdrawPatientPage;
