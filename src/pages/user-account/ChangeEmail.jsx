import BigButton from '../../components/BigButton';
import Input from '../../components/Input';
import InputWrapper from '../../components/InputWrapper';
import './ChangeEmail.css';

const ChangeEmail = () => {
  return (
    <>
      <div className="change-email">
        <InputWrapper description="이메일 변경">
          <Input placeholder="example@gmail.com" />
        </InputWrapper>
        <div className="big-button-fixed">
          <BigButton>수정하기</BigButton>
        </div>
      </div>
    </>
  );
};

export default ChangeEmail;
