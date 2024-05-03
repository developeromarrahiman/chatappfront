import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// redux
import { useSelector } from '../redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
export default function Guest({ children }) {
  // const router = useRouter();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(({ user }) => user);

  const [isAuth, setAuth] = useState(true);
  useEffect(() => {
    if (!isAuthenticated) {
      setAuth(false);
      toast.error('Login to access dashboard');
      navigate('/auth/login');
    }
  }, []);
  if (!isAuth) {
    return <h1>Loading....</h1>;
  }

  return children;
}

Guest.propTypes = {
  children: PropTypes.node.isRequired,
};
