import { BigButton, CheckButton, Input, InputContainer } from '../../components/components';

const TestPage = () => {
  return (
    <body>
      <h1>Test Page</h1>
      <InputContainer description="아이디">
        <Input placeholder="아이디" />
        <CheckButton>중복 확인</CheckButton>
      </InputContainer>
      <InputContainer description="비밀번호">
        <Input placeholder="비밀번호" type="password" />
      </InputContainer>
      <InputContainer description="생년월일">
        <Input placeholder="2000" />
        <Input placeholder="4" />
        <Input placeholder="27" />
      </InputContainer>
      <BigButton>회원가입</BigButton>
    </body>
  );
};

export default TestPage;
