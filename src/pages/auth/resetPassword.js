import React from 'react';
// material
import { styled } from '@mui/material/styles';
import { Box, Card, Container, Typography, Link } from '@mui/material';
import ResetPasswordForm from '../../components/forms/resetForm';

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
export default function ResetPage() {
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
            Reset Password
          </Typography>
          <Typography
            sx={{ color: 'text.secondary', mb: 5 }}
            textAlign='center'>
            Enter your new password
          </Typography>
          <ResetPasswordForm />
        </ContentStyle>
      </Container>
    </Box>
  );
}
