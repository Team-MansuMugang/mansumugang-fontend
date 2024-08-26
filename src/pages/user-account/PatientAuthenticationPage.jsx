import BigButton from '../../components/BigButton';
import Input from '../../components/Input';
import InputWrapper from '../../components/InputWrapper';
import MainHeader from '../../components/MainHeader';
import './PatientAuthenticationPage.css';

const PatientAuthenticationPage = () => {
  return (
    <>
      <MainHeader title="케어멤버 탈퇴하기"></MainHeader>
      <div className="patient-authentication-page">
        <InputWrapper description="아이디">
          <Input placeholder={'아이디를 입력해주세요'}></Input>
        </InputWrapper>
        <InputWrapper description="비밀번호">
          <Input placeholder={'비밀번호를 입력해주세요'}></Input>
        </InputWrapper>
        <BigButton>확인</BigButton>
      </div>
    </>
  );
};

export default PatientAuthenticationPage;
