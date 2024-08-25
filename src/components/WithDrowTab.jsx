import './WithDrowTab.css';
import '../index.css';
import SecessionBigButton from './SecessionBigButton';

const WithDrowTab = () => {
  return (
    <div className="with-drow-tab">
      <h3>정말로 탈퇴하시겠습니까?</h3>
      <p>
        보호자와 케어 맴버님의 계정의
        <br />
        &nbsp;&nbsp;&nbsp; 정보가 모두 삭제 됩니다
      </p>
      <SecessionBigButton disabled={false}>탈퇴하기</SecessionBigButton>
      <SecessionBigButton disabled={true}> 취소</SecessionBigButton>
    </div>
  );
};

export default WithDrowTab;
