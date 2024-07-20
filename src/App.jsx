import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import TestPage from './pages/test/TestPage';
import SignUpHeader from './pages/sign-up/SignUpHeader';
import GuardianSignUpPage from './pages/sign-up/GuardianSignUpPage';
import PatientSignUpPage from './pages/sign-up/PatientSignUpPage';
import SignInPage from './pages/sign-in/SignInPage';
import ChangeBirthday from './pages/user-account/ChangeBirthday';
import ChangeEmail from './pages/user-account/ChangeEmail';
import PasswordChange from './pages/user-account/PasswordChange';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SignInPage />,
  },
  {
    path: '/home',
    element: <p>homepage</p>,
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
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
