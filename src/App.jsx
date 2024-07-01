import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import TestPage from './pages/test-page/TestPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <p>homepage</p>,
  },
  {
    path: '/test',
    element: <TestPage />,
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
