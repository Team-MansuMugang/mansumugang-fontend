import Input from '../../components/Input';
import CheckButton from '../../components/CheckButton';
import InputWrapper from '../../components/InputWrapper';
import BigButton from '../../components/BigButton';

const GuardianSignUpPage = () => {
  return (
    <>
      <div className="input-container">
        <InputWrapper description="아이디">
          <Input placeholder="아이디" />
          <CheckButton>중복 확인</CheckButton>
        </InputWrapper>

        <InputWrapper description="비밀번호">
          <Input placeholder="비밀번호" />
        </InputWrapper>

        <InputWrapper description="비밀번호 확인">
          <Input placeholder="비밀번호 확인" />
        </InputWrapper>

        <InputWrapper description="이름">
          <Input placeholder="홍길동" />
        </InputWrapper>

        <InputWrapper description="닉네임 (커뮤니티)">
          <Input placeholder="닉네임" />
          <CheckButton>중복 확인</CheckButton>
        </InputWrapper>

        <InputWrapper description="생년월일">
          <Input placeholder="2000" />
          <Input placeholder="4" />
          <Input placeholder="27" />
        </InputWrapper>

        <InputWrapper description="전화번호">
          <Input placeholder="010 1234 5678" />
        </InputWrapper>

        <InputWrapper description="이메일">
          <Input placeholder="example@gmail.com" />
        </InputWrapper>
      </div>

      <div className="big-button-wrap">
        <BigButton>회원가입</BigButton>
      </div>
    </>
  );
};

export default GuardianSignUpPage;
