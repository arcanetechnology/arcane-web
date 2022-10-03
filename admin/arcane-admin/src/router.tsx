/** @format */
import { createBrowserRouter } from 'react-router-dom';
import Root from './routes/root';
import ErrorPage from './error-page';
import Index from './routes';
import { ProtectedRoute } from './components';
import Auth from './routes/auth';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Root />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Index />,
      },
    ],
  },
  {
    path: '/auth',
    element: <Auth />,
    errorElement: <ErrorPage />,
  },
]);

export default router;
