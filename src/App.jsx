import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import TestPage from './pages/test/TestPage';
import SignUpHeader from './pages/sign-up/SignUpHeader';
import GuardianSignUpPage from './pages/sign-up/GuardianSignUpPage';
import PatientSignUpPage from './pages/sign-up/PatientSignUpPage';
import SignInPage from './pages/sign-in/SignInPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <p>homepage</p>,
  },
  {
    path: '/test',
    element: <TestPage />,
  },
  {
    path: '/sign-in',
    element: <SignInPage />,
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
