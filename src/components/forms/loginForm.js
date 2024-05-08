import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// notification
import toast from 'react-hot-toast';
// formik
import { useFormik, Form, FormikProvider } from 'formik';
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  FormControlLabel,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// icons
import {
  MdLock,
  MdOutlineVisibility,
  MdOutlineVisibilityOff,
} from 'react-icons/md';
import { MdEmail } from 'react-icons/md';

// redux
import { useMutation } from 'react-query';
import { setLogin } from '../../redux/slices/user';

// api
import * as api from '../../services';
import { useDispatch } from 'react-redux';
import AlertMessagePopup from '../userDialog';

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [open, setopen] = useState(false);
  const [data, setdata] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mutate: mutateApprove } = useMutation(api.updateAlertMessage, {
    onSuccess: async (res) => {
      window.localStorage.setItem('token', data.token);
      dispatch(setLogin(data.user));
      toast.success('Sigin successfully');
      setLoading(false);
      navigate('/');
      setopen(false);
    },
  });
  // mutate
  const { mutate, isLoading } = useMutation(api.login, {
    onSuccess: async (res) => {
      setLoading(false);
      if (res?.data?.alert) {
        setdata(res.data);
        setopen(true);
      } else {
        window.localStorage.setItem('token', res?.data?.token);
        dispatch(setLogin(res?.data?.user));
        toast.success('Sigin successfully');
        navigate('/');
      }
    },
    onError: (err) => {
      const message = JSON.stringify(err.response.data.message);
      toast.error(message ? JSON.parse(message) : 'Something went wrong!');
      setLoading(false);
    },
  });

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Enter valid email')
      .required('Email is required.'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters'),
  });

  // Formik
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const { email, password } = values;
      mutate({ email, password });
      setLoading(false);
    },
  });

  const { errors, touched, values, handleSubmit, getFieldProps } = formik;

  const handleClose = () => {
    window.localStorage.setItem('token', data.token);
    dispatch(setLogin(data.user));
    toast.success('Sigin successfully');
    navigate('/');
    setopen(false);
  };
  return (
    <>
      <AlertMessagePopup
        open={open}
        setOpen={setopen}
        data={data?.alert}
        onConfirm={() => mutateApprove(data?.alert?._id)}
        handleClose={handleClose}
      />

      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              autoComplete="email"
              label="Email or Username"
              {...getFieldProps('email')}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MdEmail size={24} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              autoComplete="current-password"
              type={showPassword ? 'text' : 'password'}
              label="Password"
              {...getFieldProps('password')}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MdLock size={24} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? (
                        <MdOutlineVisibility size={24} />
                      ) : (
                        <MdOutlineVisibilityOff size={24} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ my: 2 }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  {...getFieldProps('remember')}
                  checked={values.remember}
                />
              }
              label="Remember me"
            />

            <Link
              component={RouterLink}
              variant="subtitle2"
              to="/auth/forget-password"
            >
              Forgot Password
            </Link>
          </Stack>

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            sx={{
              textTransform: 'capitalize',
            }}
            loading={isLoading}
          >
            Sign In
          </LoadingButton>
        </Form>
      </FormikProvider>
    </>
  );
}
