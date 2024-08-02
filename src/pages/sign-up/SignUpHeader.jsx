import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import './SignUp.css';
import ToggleSwitch from '../../components/ToggleSwitch';

const SignUpHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const activeIndex = location.pathname.includes('/guardian') ? 1 : 0;

  const handlePatientClick = () => navigate('/sign-up/patient');
  const handleGuardianClick = () => navigate('/sign-up/guardian');
  const handleBackClick = () => navigate('/');

  return (
    <div className="sign-up">
      <div className="header">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          onClick={handleBackClick}
        >
          <path fill="currentColor" d="m14 18l-6-6l6-6l1.4 1.4l-4.6 4.6l4.6 4.6z" />
        </svg>
        <h1>만수무강</h1>
      </div>
      <ToggleSwitch
        labels={['케어 맴버', '보호자']}
        active={activeIndex}
        onClicks={[handlePatientClick, handleGuardianClick]}
      />
      <Outlet />
    </div>
  );
};

export default SignUpHeader;
