import * as Yup from 'yup';
import { useState } from 'react';
// react navigate dom
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
import { useDispatch } from 'react-redux';
import { useMutation } from 'react-query';
// api
import * as api from '../../services';
import {
  MdLock,
  MdOutlineVisibility,
  MdOutlineVisibilityOff,
} from 'react-icons/md';
import { MdEmail } from 'react-icons/md';
import { FaUser } from 'react-icons/fa6';

// redux
import { setLogin } from '../../redux/slices/user';

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { mutate } = useMutation(api.register, {
    onSuccess: async (res) => {
      window.localStorage.setItem('token', res?.data?.token);
      dispatch(setLogin(res?.data?.user));
      toast.success('signup successfully');
      setLoading(false);
      navigate('/');
    },
    onError: (err) => {
      const message = JSON.stringify(err.response.data.message);
      toast.error(message ? JSON.parse(message) : 'Something went wrong!');
      setLoading(false);
    },
  });

  // Define validation schema
  const RegisterSchema = Yup.object().shape({
    name: Yup.string().required('Name is required.'),
    email: Yup.string()
      .email('Enter valid email')
      .required('Email is required.'),
    password: Yup.string()
      .required('Password is required.')
      .min(8, 'Password should be 8 characters or longer.'),
    // image: Yup.mixed().required('Image is required.'),
  });

  // Formik
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values) => {
      setLoading(true);
      await mutate({
        ...values,
      });
    },
  });

  const { errors, touched, handleSubmit, values, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3} mb={3}>
          <TextField
            fullWidth
            autoComplete="name"
            label="Name"
            {...getFieldProps('name')}
            error={Boolean(touched.name && errors.name)}
            helperText={touched.name && errors.name}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FaUser size={22} />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            autoComplete="username"
            label="Email"
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
            label="Password"
            {...getFieldProps('password')}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          sx={{
            textTransform: 'capitalize',
          }}
          loading={loading}
        >
          Sign Up
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
