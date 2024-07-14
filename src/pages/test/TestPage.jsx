// import { BigButton, CheckButton, Input, InputWrapper } from '../../components/components';
import BigButton from '../../components/BigButton';
import CheckButton from '../../components/CheckButton';
import Input from '../../components/Input';
import InputWrapper from '../../components/InputWrapper';
import SubLink from '../../components/SubLink';
import ToggleSwitch from '../../components/ToggleSwitch';
import ProfileEditButton from '../../components/ProfileEditButton';
import ContainerWrapper from '../../components/ContainerWrapper';

const TestPage = () => {
  return (
    <body>
      <h1>Test Page</h1>
      <InputWrapper
        description="아이디"
        status="warning"
        statusDescription="! 중복된 아이디 입니다."
      >
        <Input placeholder="아이디" status="warning" />
        <CheckButton>중복 확인</CheckButton>
      </InputWrapper>
      <InputWrapper description="비밀번호">
        <Input placeholder="비밀번호" type="password" />
      </InputWrapper>
      <InputWrapper description="생년월일">
        <Input placeholder="2000" />
        <Input placeholder="4" />
        <Input placeholder="27" />
      </InputWrapper>
      <BigButton disabled={false}>회원가입</BigButton>
      <SubLink to="/">회원가입</SubLink>
      <ToggleSwitch labels={['보호자', '케어 맴버']} active={0} />
      <ProfileEditButton disabled={false}>프로필 수정하기</ProfileEditButton>
      <ContainerWrapper description="내 계정">
        <SubLink to="/">회원가입</SubLink>
        <br></br>
        <SubLink to="/">회원가입</SubLink>
        <br></br>
        <SubLink to="/">회원가입</SubLink>
      </ContainerWrapper>
    </body>
  );
};

export default TestPage;
