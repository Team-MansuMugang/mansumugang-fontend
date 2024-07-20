import { useState } from 'react';
import { PatientLoginNotAllowedError, UserNotFoundError } from '../../apis/utility/errors';
import BigButton from '../../components/BigButton';
import Input from '../../components/Input';
import SubLink from '../../components/SubLink';
import { toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SignInPage.css';
import submitSignin from '../../apis/api/submitSignin';
import { useNavigate } from 'react-router-dom';

const SignInPage = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [idStatus, setIdStatus] = useState('default');
  const [passwordStatus, setPasswordStatus] = useState('default');
  const navigate = useNavigate();

  const handleIdChange = (event) => {
    setId(event.target.value);

    // Input 컨포넌트 Status 관리 로직
    if (idStatus === 'error') {
      setIdStatus('default');
      setPasswordStatus('default');
    }
    setIdStatus(event.target.value ? 'default' : 'warning');
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);

    // Input 컨포넌트 Status 관리 로직
    if (idStatus === 'error') {
      setIdStatus('default');
      setPasswordStatus('default');
    }
    setPasswordStatus(event.target.value ? 'default' : 'warning');
  };

  const handleLogin = async () => {
    if (!id || !password) {
      setIdStatus(id ? 'default' : 'warning');
      setPasswordStatus(password ? 'default' : 'warning');
      toast.warn('아이디와 비밀번호를 모두 입력해주세요', { position: 'bottom-center' });
      return;
    }

    try {
      await submitSignin({ username: id, password });
      navigate('/home');
    } catch (error) {
      if (error instanceof PatientLoginNotAllowedError) {
        toast.info(
          <div>
            케이 맴버님은 앱을 통해서 로그인하실 수 있습니다
            <br />
            플레이스토어에서 '만수무강'을 검색해주세요
          </div>,
          {
            position: 'bottom-center',
          },
        );
      } else if (error instanceof UserNotFoundError) {
        setIdStatus('error');
        setPasswordStatus('error');
        toast.error('아이디 또는 비밀번호가 올바르지 않습니다', { position: 'bottom-center' });
      } else {
        toast.error('알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요', {
          position: 'bottom-center',
        });
      }
    }
  };

  return (
    <>
      <div className="sign-in">
        <h1>만수무강</h1>

        <p>만수무강을 위한 노인 케어 서비스</p>

        <div className="sign-in-input">
          <Input placeholder="아이디" status={idStatus} onChange={handleIdChange} />
          <Input
            placeholder="비밀번호"
            type="password"
            status={passwordStatus}
            onChange={handlePasswordChange}
          />
        </div>

        <BigButton onClick={handleLogin}>로그인</BigButton>
        <SubLink to="/sign-up">회원가입</SubLink>
        <div className="found-link">
          <SubLink to="/">아이디 / 비밀번호 찾기</SubLink>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
