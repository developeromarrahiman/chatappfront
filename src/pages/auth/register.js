import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Card, Container, Typography, Link } from '@mui/material';
import RegisterForm from '../../components/forms/registerForm';

const ContentStyle = styled(Card)(({ theme }) => ({
  maxWidth: 458,
  margin: 'auto',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(3, 3),
  borderRadius: 8,
  boxShadow:
    '0px 10px 32px -4px rgba(19, 25, 39, 0.10),0px 6px 14px -6px rgba(19, 25, 39, 0.12)',
}));
export default function RegisterPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}>
      <Container maxWidth='sm'>
        <ContentStyle>
          <Typography
            textAlign='center'
            mb={1}
            variant='h4'
            fontWeight={700}
            fontSize={24}
            gutterBottom>
            Create an Account
          </Typography>
          <Typography
            sx={{ color: 'text.secondary', mb: 5 }}
            textAlign='center'>
            Register here if you are a new customer
          </Typography>
          <RegisterForm />
          <Typography
            variant='subtitle2'
            sx={{ mt: 3, textAlign: 'center' }}>
            Already have an account?{' '}
            <Link
              component={RouterLink}
              to='/auth/login'>
              Sign in
            </Link>
          </Typography>
        </ContentStyle>
      </Container>
    </Box>
  );
}
