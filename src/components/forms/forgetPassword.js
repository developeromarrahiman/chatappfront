import { useState } from 'react'
import * as Yup from 'yup'
import PropTypes from 'prop-types'
// formik
import { Form, FormikProvider, useFormik } from 'formik'
// material
import { TextField, Alert, Stack, InputAdornment } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import EmailIcon from '@mui/icons-material/Email'
// hooks
import useIsMountedRef from '../../hooks/useIsMountedRef'
// api
import * as api from '../../services'

// notification
import toast from 'react-hot-toast'
// react query
import { useMutation } from 'react-query'

ForgetPasswordForm.propTypes = {
  onSent: PropTypes.func,
  onGetEmail: PropTypes.func,
}

export default function ForgetPasswordForm({ onSent, onGetEmail }) {
  const isMountedRef = useIsMountedRef()
  const [loading, setloading] = useState(false)
  const { mutate } = useMutation(api.forgetPassword, {
    onSuccess: (data) => {
      onSent()
      onGetEmail(data.email)
      setloading(false)
      console.log(data, 'forget pasword')
    },
    onError: (err) => {
      setloading(false)
      toast.error(err.data.message)
    },
  })

  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email('email must be a valid email address')
      .required('email is required'),
  })

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: async (values, { setErrors }) => {
      setloading(true)
      toast.success('Send Request')
      setloading(false)
      try {
        setloading(true)
        await mutate({
          email: values.email,
          domain: process.env.REACT_APP_DOMAIN,
        })
      } catch (error) {
        console.error(error)
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.response.data.message })
        }
      }
    },
  })

  const { errors, touched, handleSubmit, getFieldProps } = formik

  return (
    <FormikProvider value={formik}>
      <Form
        autoComplete='off'
        noValidate
        onSubmit={handleSubmit}
      >
        <Stack spacing={3}>
          {errors.afterSubmit && (
            <Alert severity='error'>{errors.afterSubmit}</Alert>
          )}

          <TextField
            fullWidth
            {...getFieldProps('email')}
            type='email'
            label='Email Address'
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
          />

          <LoadingButton
            fullWidth
            size='large'
            type='submit'
            variant='contained'
            loading={loading}
          >
            send Mail
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  )
}
