import BigButton from '../../components/BigButton';
import Input from '../../components/Input';
import SubLink from '../../components/SubLink';
import './SignInPage.css';

const SignInPage = () => {
  return (
    <div className="sign-in-container">
      <h1>만수무강</h1>
      <p>만수무강을 위한 노인 케어 서비스</p>
      <Input placeholder="아이디" status="default" />
      <Input placeholder="비밀번호" status="default" />
      <BigButton disabled={false}>로그인</BigButton>
      <SubLink to="/">회원가입</SubLink>
      <SubLink to="/">아이디 / 비밀번호 찾기</SubLink>
    </div>
  );
};

export default SignInPage;
