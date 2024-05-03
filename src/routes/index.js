import { Navigate, useRoutes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
// layouts
import DashboardLayout from '../layouts/dashboard';
import AuthLayout from '../layouts/auth';
// import LoadingScreen from 'src/components/loadingScreen';
import Typography from '@mui/material/Typography';
// guards
import GuestGuard from '../guards/guest';
import AuthGuard from '../guards/auth';
// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<Typography variant="body1"> Loading</Typography>}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: '*',
      element: (
        <GuestGuard>
          <AuthLayout />
        </GuestGuard>
      ),
      children: [
        { path: '404', element: <NotFound /> },
        {
          path: '*',
          element: <Navigate to="/404" replace />,
        },
      ],
    },
    {
      path: '/',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [{ path: '', element: <ChatPage /> }],
    },
    {
      path: '/',
      element: (
        // <AuthGuard>
        <DashboardLayout />
        // </AuthGuard>
      ),
      children: [{ path: '/chat-old', element: <ChatOldPage /> }],
    },

    {
      path: '/auth',
      element: (
        <GuestGuard>
          <AuthLayout />
        </GuestGuard>
      ),
      children: [
        { path: 'login', element: <Login /> },
        {
          path: '/auth/forget-password',
          element: <ForgetPassword />,
        },
        {
          path: '/auth/reset-password',
          element: <ResetPassword />,
        },
        {
          path: '/auth/register',
          element: <Register />,
        },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
}
// Main

const ChatPage = Loadable(lazy(() => import('../pages/chat')));
const SavedMessages = Loadable(lazy(() => import('../pages/savedMessages')));
const ChatOldPage = Loadable(lazy(() => import('../pages/chat-old')));
// notfound
const NotFound = Loadable(lazy(() => import('../pages/404')));
// auth
const ForgetPassword = Loadable(
  lazy(() => import('../pages/auth/forgetPassword'))
);
const ResetPassword = Loadable(
  lazy(() => import('../pages/auth/resetPassword'))
);
const Login = Loadable(lazy(() => import('../pages/auth/login')));
const Register = Loadable(lazy(() => import('../pages/auth/register')));
