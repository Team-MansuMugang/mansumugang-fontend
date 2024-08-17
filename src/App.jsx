import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import TestPage from './pages/test/TestPage';
import SignUpHeader from './pages/sign-up/SignUpHeader';
import GuardianSignUpPage from './pages/sign-up/GuardianSignUpPage';
import PatientSignUpPage from './pages/sign-up/PatientSignUpPage';
import SignInPage from './pages/sign-in/SignInPage';
import ChangeBirthday from './pages/user-account/ChangeBirthday';
import ChangeEmail from './pages/user-account/ChangeEmail';
import PasswordChange from './pages/user-account/PasswordChange';
import AuthHomePage from './pages/test/AuthHomePage';
import MedicineListPage from './pages/test/MedicineListPage';
import MainPage from './pages/home/MainPage';
import ChangeProfile from './pages/user-account/ChangeProfile';
import AddMember from './pages/user-account/AddMember';
import AccountPage from './pages/user-account/AccountPage';
import MemberEdit from './pages/user-account/MemberEdit';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VoiceMessagePage from './pages/voice-message/VoiceMessagePage';
import DetailVoiceMessagePage from './pages/voice-message/DetailVoiceMessagePage';
import SchedulePage from './pages/schedule/SchedulePage';
import MedicineEditPage from './pages/schedule/MedicineEditPage';
import MedicineAddPage from './pages/schedule/MedicineAddPage';
import HospitalEditPage from './pages/schedule/HospitalEditPage';
import HospitalAddPage from './pages/schedule/HospitalAddPage';

const router = createBrowserRouter([
  { path: '/', element: <SignInPage /> },
  {
    element: <SignUpHeader />,
    children: [
      { path: '/sign-up', element: <PatientSignUpPage /> },
      { path: '/sign-up/patient', element: <PatientSignUpPage /> },
      { path: '/sign-up/guardian', element: <GuardianSignUpPage /> },
    ],
  },
  {
    path: '/home',
    children: [
      { path: '', element: <MainPage /> },
      { path: 'notifications', element: <></> },
      { path: 'community', element: <></> },
      { path: 'account', element: <AccountPage /> },
    ],
  },
  {
    path: '/schedule',
    children: [
      { path: ':patientId', element: <SchedulePage /> },
      { path: 'medicine-edit/:patientId/:medicineId', element: <MedicineEditPage /> },
      { path: 'medicine-add/:patientId/', element: <MedicineAddPage /> },
      { path: 'hospital-edit/:patientId/:hospitalId', element: <HospitalEditPage /> },
      { path: 'hospital-add/:patientId/', element: <HospitalAddPage /> },
    ],
  },
  {
    path: '/voice-message',
    children: [
      { path: '', element: <VoiceMessagePage /> },
      { path: 'detail', element: <DetailVoiceMessagePage /> },
    ],
  },
  {
    path: '/account',
    children: [
      { path: 'edit-profile', element: <ChangeProfile /> },
      { path: 'edit-birthday', element: <ChangeBirthday /> },
      { path: 'edit-email', element: <ChangeEmail /> },
      { path: 'edit-password', element: <PasswordChange /> },
      { path: 'add-member', element: <AddMember /> },
      { path: 'edit-member', element: <MemberEdit /> },
    ],
  },
  {
    path: '/community',
    children: [
      { path: 'search', element: <></> },
      { path: 'search-results', element: <></> },
      { path: 'post', element: <></> },
      { path: 'new-post', element: <></> },
      { path: 'edit-post', element: <></> },
    ],
  },
  {
    path: '/test',
    element: <TestPage />,
    children: [
      { path: 'auth', element: <AuthHomePage /> },
      { path: 'ml', element: <MedicineListPage /> },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
      <ToastContainer
        position="top-center"
        autoClose={2500}
        limit={3}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      />
    </>
  );
}

export default App;
