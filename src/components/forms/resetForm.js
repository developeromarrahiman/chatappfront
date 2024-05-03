import React from 'react';
import * as Yup from 'yup';
// formik
import { Form, FormikProvider, useFormik } from 'formik';
// react query
// import { useMutation } from 'react-query';
// material
import {
  TextField,
  Alert,
  Stack,
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
// hooks
// import useIsMountedRef from "../../../../hooks/useIsMountedRef";
// api
// import * as api from 'src/services';

// notification
// import toast from 'react-hot-toast';
// react rputer dom
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';

// api
import * as api from '../../services';

export default function ResetPasswordForm() {
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPassword1, setShowPassword1] = React.useState(false);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  const { mutate } = useMutation(api.resetPassword, {
    onSuccess: (data) => {
      setLoading(false);
      navigate('/auth/login');
      toast.success(data.message);
    },
    onError: (err) => {
      setLoading(false);
      toast.error('error');
    },
  });

  const ResetPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+$/,
        'Password must contain one uppercase letter, one lowercase letter and one number'
      ),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref('password'), null],
      'passwords must match'
    ),
  });

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: async (values) => {
      setLoading(true);
      await mutate({ newPassword: values.password, token });
    },
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {errors.afterSubmit && (
            <Alert severity="error">{errors.afterSubmit}</Alert>
          )}
          <TextField
            fullWidth
            autoComplete="current-password"
            type={'password'}
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

          <TextField
            fullWidth
            autoComplete="current-password"
            type={'password'}
            label="confirm Password"
            {...getFieldProps('confirmPassword')}
            error={Boolean(touched.confirmPassword && errors.confirmPassword)}
            helperText={touched.confirmPassword && errors.confirmPassword}
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
                    onClick={() => setShowPassword1((prev) => !prev)}
                  >
                    {showPassword1 ? (
                      <MdOutlineVisibility size={24} />
                    ) : (
                      <MdOutlineVisibilityOff size={24} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={loading}
          >
            Save
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
