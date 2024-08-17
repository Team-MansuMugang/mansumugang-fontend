import { useNavigate } from 'react-router-dom';
import BigButton from '../../components/BigButton';
import Input from '../../components/Input';
import InputWrapper from '../../components/InputWrapper';
import MainHeader from '../../components/MainHeader';
import './ChangeEmail.css';

const ChangeEmail = () => {
  const navigate = useNavigate();

  return (
    <>
      <MainHeader title="이메일 변경하기" onClickLeft={() => navigate(-1)}></MainHeader>
      <div className="change-email">
        <InputWrapper description="이메일 변경">
          <Input placeholder="example@gmail.com" />
        </InputWrapper>
        <div className="big-button-wrap">
          <BigButton>수정하기</BigButton>
        </div>
      </div>
    </>
  );
};

export default ChangeEmail;
