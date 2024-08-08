import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import TestPage from './pages/test/TestPage';
import SignUpHeader from './pages/sign-up/SignUpHeader';
import GuardianSignUpPage from './pages/sign-up/GuardianSignUpPage';
import PatientSignUpPage from './pages/sign-up/PatientSignUpPage';
import SignInPage from './pages/sign-in/SignInPage';
import ChangeBirthday from './pages/user-account/ChangeBirthday';
import ChangeEmail from './pages/user-account/ChangeEmail';
import PasswordChange from './pages/user-account/PasswordChange';
import authHomePage from './pages/test/authHomePage';
import MainPage from './pages/home/MainPage';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VoiceMessagePage from './pages/voice-message/VoiceMessagePage';
import DetailVoiceMessagePage from './pages/voice-message/DetailVoiceMessagePage';
const router = createBrowserRouter([
  {
    path: '/',
    element: <SignInPage />,
  },
  {
    path: '/main-page',
    element: <MainPage />,
  },
  {
    path: '/home',
    element: <authHomePage />,
  },
  {
    path: '/voice-message-page',
    element: <VoiceMessagePage />,
  },
  {
    path: '/detail-voice-message-page',
    element: <DetailVoiceMessagePage />,
  },
  {
    path: '/test',
    element: <TestPage />,
  },
  {
    path: '/change-birthday',
    element: <ChangeBirthday />,
  },
  {
    path: '/change-email',
    element: <ChangeEmail />,
  },
  {
    path: '/password-change',
    element: <PasswordChange />,
  },
  {
    element: <SignUpHeader />,
    children: [
      {
        path: '/sign-up',
        element: <PatientSignUpPage />,
      },
      {
        path: '/sign-up/patient',
        element: <PatientSignUpPage />,
      },
      {
        path: '/sign-up/Guardian',
        element: <GuardianSignUpPage />,
      },
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
