import { useEffect, useState } from 'react';
// redux
import { useSelector } from 'react-redux';
// PropTypes;
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
Guest.propTypes = {
  children: PropTypes.node.isRequired,
};
export default function Guest({ children }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(({ user }) => user);

  const [isAuth, setAuth] = useState(true);
  useEffect(() => {
    if (isAuthenticated) {
      setAuth(false);
      navigate('/');
      toast.error('You are logged in.');
    }
  }, []);
  if (!isAuth) {
    return <h1>Loading....</h1>;
  }
  return children;
}
