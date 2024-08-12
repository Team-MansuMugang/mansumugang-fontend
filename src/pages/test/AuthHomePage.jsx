import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import submitSignout from '../../apis/api/submitSignout';
import renewRefreshToken from '../../apis/api/renewRefreshToken';

const AuthHomePage = () => {
  const navigate = useNavigate();
  const [temp, setTemp] = useState(0);

  const refreshApp = () => {
    setTemp(temp + 1);
  };

  const handleRenewToken = async () => {
    try {
      await renewRefreshToken();
      alert('토큰이 성공적으로 갱신되었습니다.');
    } catch (error) {
      alert(`토큰 갱신에 실패했습니다: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>Home Page</h1>
      <p>{localStorage.getItem('refreshToken')}</p>
      <p>{localStorage.getItem('accessToken')}</p>
      <p>{localStorage.getItem('userType')}</p>
      <button onClick={submitSignout}>로그아웃</button>
      <button onClick={refreshApp}>새로고침</button>
      <button
        onClick={() => {
          navigate('/');
        }}
      >
        로그인 페이지
      </button>
      <button onClick={handleRenewToken}>토큰 갱신</button>
    </div>
  );
};

export default AuthHomePage;
