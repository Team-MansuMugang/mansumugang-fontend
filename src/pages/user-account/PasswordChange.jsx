import { useNavigate } from 'react-router-dom';
import BigButton from '../../components/BigButton';
import Input from '../../components/Input';
import InputWrapper from '../../components/InputWrapper';
import MainHeader from '../../components/MainHeader';
import './PasswordChange.css';

const PasswordChange = () => {
  const navigate = useNavigate();

  return (
    <>
      <MainHeader title="비밀번호 변경하기" onClickLeft={() => navigate(-1)}></MainHeader>
      <div className="password-change">
        <InputWrapper description="비밀번호 변경">
          <Input placeholder="비밀번호" />
        </InputWrapper>
        <InputWrapper description="비밀번호 변경 확인">
          <Input placeholder="비밀번호를 다시 입력하세요" />
        </InputWrapper>
        <div className="big-button-wrap">
          <BigButton>수정하기</BigButton>
        </div>
      </div>
    </>
  );
};

export default PasswordChange;
