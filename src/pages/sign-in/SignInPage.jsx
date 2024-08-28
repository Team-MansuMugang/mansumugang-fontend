import { useEffect, useState } from 'react';
import { PatientLoginNotAllowedError, UserNotFoundError } from '../../apis/utility/errors';
import BigButton from '../../components/BigButton';
import Input from '../../components/Input';
import SubLink from '../../components/SubLink';
import { toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SignInPage.css';
import submitSignin from '../../apis/api/submitSignin';
import { useNavigate } from 'react-router-dom';
import mansumugangLogo from '../../assets/img/mansumugang-logo.png';
import fetchWhoAmI from '../../apis/api/fetchWhoAmI';
import renewRefreshToken from '../../apis/api/renewRefreshToken';
import { ExpiredAccessTokenError, NotValidAccessTokenError } from '../../apis/utility/errors';
import 게시글 from '../../assets/img/게시글.png';
import 달력 from '../../assets/img/달력.png';
import 병원등록 from '../../assets/img/병원 등록.png';
import 약등록 from '../../assets/img/약 등록.png';
import 음성메세지상세정보 from '../../assets/img/음성메세지 상세정보.png';
import 음성메세지 from '../../assets/img/음성메세지.png';
import 일정추가 from '../../assets/img/일정 추가.png';
import 지도 from '../../assets/img/지도.png';
import 처방전선택 from '../../assets/img/처방전 선택.png';
import 커뮤니티 from '../../assets/img/커뮤니티.png';
import 홈화면 from '../../assets/img/홈화면.png';
import 홈화면2 from '../../assets/img/홈화면2.png';
import 알림 from '../../assets/img/알림.png';
import 알림2 from '../../assets/img/알림2.png';
import KeyboardArrowDownIcon from '../../assets/svg/keyboard-arrow-down.svg?react';

const SignInPage = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [idStatus, setIdStatus] = useState('default');
  const [passwordStatus, setPasswordStatus] = useState('default');
  const navigate = useNavigate();

  useEffect(() => {
    const autoLogin = async () => {
      try {
        await fetchWhoAmI();
        navigate('/home');
      } catch (error) {
        if (error instanceof ExpiredAccessTokenError) {
          await renewRefreshToken();
          autoLogin();
        }
      }
    };
    autoLogin();
  }, []);

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
            케이 멤버님은 앱을 통해서 로그인하실 수 있습니다
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
        toast.error('오류가 발생했습니다. 잠시 후 다시 시도해주세요', {
          position: 'bottom-center',
        });
      }
    }
  };

  return (
    <>
      <div className="sign-in">
        <div className="container">
          <div className="logo-container">
            <img src={mansumugangLogo} alt="만수무강 로고" className="logo" />
            <h1>만수무강</h1>
          </div>

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
        </div>
        <a href="#explanation-target" className="to-explanation">
          <KeyboardArrowDownIcon />
        </a>
        <span className="to-explanation-text">처음이신가요?</span>
      </div>
      <div className="explanation" id="explanation-target">
        <div className="gradation-top" />
        <h2>
          우리 가족의 건강을 <br /> 한 손에!
        </h2>

        <div className="image-wrapper left">
          <img src={홈화면} alt="" />
        </div>
        <p>
          만수무강 앱은 가족의 건강을
          <br />
          효율적으로 관리할 수 있는
          <br />
          최적의 솔루션입니다
        </p>

        <div className="image-wrapper right">
          <img src={약등록} alt="" />
        </div>
        <p>
          사랑하는 이의 약 복용
          <br />
          만수무강 앱으로 관리하세요
        </p>

        <div className="image-wrapper left">
          <img src={처방전선택} alt="" />
        </div>
        <p>
          처방전 사진을 쉽게 저장하고
          <br />
          가족과 공유하세요
        </p>

        <div className="image-wrapper right">
          <img src={병원등록} alt="" />
        </div>
        <p>
          병원 방문 일정을 관리하고
          <br />
          가족과 공유하여 잊지 않도록
          <br />
          도와드립니다
        </p>

        <div className="image-wrapper left">
          <img src={알림2} alt="" />
        </div>
        <p>
          가족의 건강,
          <br />
          실시간 알림으로 안심하세요.
        </p>

        <div className="image-wrapper right">
          <img src={음성메세지상세정보} alt="" />
        </div>

        <p>
          음성 메시지로 소통하고
          <br />
          텍스트로 변환하여
          <br />
          더욱 쉽게 기록하세요
        </p>

        <div className="image-wrapper left">
          <img src={지도} alt="" />
        </div>

        <p>
          가족의 실시간 위치를 공유하여
          <br />
          안심할 수 있습니다
        </p>

        <div className="image-wrapper right">
          <img src={커뮤니티} alt="" />
        </div>

        <p>
          다양한 건강 정보를 공유하고,
          <br />
          같은 관심사를 가진 사람들과
          <br />
          소통할 수 있는 커뮤니티 공간을
          <br />
          제공합니다
        </p>

        <div className="gradation-bottom" />
      </div>
      <div className="bottom-explanation">
        <span>
          보호자님께서는 <br /> 여기에서 로그인하세요
        </span>
        <a href="#">보호자 로그인하기</a>
        <span>
          케어맴버님께서는 <br /> 전용 앱을 다운로드하세요
        </span>
        <a href="https://github.com/Team-MansuMugang/mansumugang-android/releases/tag/1.0.0">
          케어맴버용 앱 다운로드
        </a>
        <span>
          아직 회원이 아니시다면 <br /> 지금 회원가입하세요
        </span>
        <a href="#">회원가입 하러 가기</a>
      </div>
    </>
  );
};

export default SignInPage;
