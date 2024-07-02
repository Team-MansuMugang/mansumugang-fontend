import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import './SignUp.css';
import ToggleSwitch from '../../components/ToggleSwitch';

const SignUpHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const activeIndex = location.pathname.includes('/guardian') ? 1 : 0;

  const handlePatientClick = () => navigate('/sign-up/patient');
  const handleGuardianClick = () => navigate('/sign-up/guardian');

  return (
    <div className="sign-up">
      <h1>만수무강</h1>
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
