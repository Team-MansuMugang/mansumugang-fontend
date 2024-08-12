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
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    element: <AuthHomePage />,
  },
  {
    path: '/test',
    element: <TestPage />,
  },
  {
    path: '/change-profile',
    element: <ChangeProfile />,
  },
  {
    path: '/testml',
    element: <MedicineListPage />,
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
