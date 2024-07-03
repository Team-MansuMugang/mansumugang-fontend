import BigButton from '../../components/BigButton';
import Input from '../../components/Input';
import SubLink from '../../components/SubLink';
import './SignInPage.css';

const SignInPage = () => {
  return (
    <>
      <div className="sign-in">
        <div className="sign-in-h1">
          <h1>만수무강</h1>
        </div>

        <div className="sign-in-p">
          <p>만수무강을 위한 노인 케어 서비스</p>
        </div>

        <div className="sign-in-input">
          <Input placeholder="아이디" status="default" />
          <Input placeholder="비밀번호" status="default" />
        </div>

        <BigButton disabled={false}>로그인</BigButton>
        <div className="sign-up-link">
          <SubLink to="/">회원가입</SubLink>
        </div>
        <div className="found-link">
          <SubLink to="/">아이디 / 비밀번호 찾기</SubLink>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
