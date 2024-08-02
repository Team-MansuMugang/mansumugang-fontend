import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import submitSignout from '../../apis/api/submitSignout';

const authHomePage = () => {
  const navigate = useNavigate();
  const [temp, setTemp] = useState(0);

  const refreshApp = () => {
    setTemp(temp + 1);
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
    </div>
  );
};

export default authHomePage;
