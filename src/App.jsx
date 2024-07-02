import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import TestPage from './pages/test-page/TestPage';
import SignUpHeader from './pages/sign-up/SignUpHeader';
import GuardianSignUpPage from './pages/sign-up/GuardianSignUpPage';
import PatientSignUpPage from './pages/sign-up/PatientSignUpPage';

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
