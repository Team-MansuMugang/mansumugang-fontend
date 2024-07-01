import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import TestPage from './pages/test/TestPage';
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
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
