import React, { useState } from 'react';
import MainHeader from '../../components/MainHeader';
import SecessionBigButton from '../../components/SecessionBigButton';
import './WithDrowPage.css';
import '../../index.css';

const WithDrowPage = () => {
  const [isTabVisible, setIsTabVisible] = useState(false); // WithDrowTab 표시 상태

  const handleButtonClick = () => {
    setIsTabVisible(true); // 버튼 클릭 시 WithDrowTab 표시
  };

  const handleCancelClick = () => {
    setIsTabVisible(false); // 취소 버튼 클릭 시 WithDrowTab 숨김
  };

  return (
    <>
      <MainHeader title="회원 탈퇴하기" isLeftButtonEnable></MainHeader>
      <div className="with-drow-page">
        <p>
          회원님께서 서비스에서 탈퇴할 경우,{' '}
          <span className="bold">
            회원님께서 보호자로 등록된 계정과, 계정에 연동된 모든 케어 멤버 계정
          </span>{' '}
          또한 일괄적으로 탈퇴됩니다.
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
          <SecessionBigButton disabled={false} onClick={handleButtonClick}>
            탈퇴하기
          </SecessionBigButton>
        </div>
      </div>

      {isTabVisible && (
        <div className="overlay">
          <WithDrowTab onCancel={handleCancelClick} />
        </div>
      )}
    </>
  );
};

const WithDrowTab = ({ onCancel }) => {
  return (
    <div className="with-drow-tab">
      <h3>정말로 탈퇴하시겠습니까?</h3>
      <p>
        보호자와 케어 맴버님의 계정의
        <br />
        &nbsp;&nbsp;&nbsp; 정보가 모두 삭제 됩니다
      </p>
      <SecessionBigButton onClick={onclick}>탈퇴하기</SecessionBigButton>
      <SecessionBigButton onClick={onCancel} variant="white-black">
        취소
      </SecessionBigButton>
    </div>
  );
};

export default WithDrowPage;
