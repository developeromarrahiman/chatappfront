import { Link as RouterLink } from 'react-router-dom';
// material
import { styled, useTheme } from '@mui/material/styles';
import { Box, Button, Typography } from '@mui/material';
// ----------------------------------------------------------------------

const RootStyle = styled('div')(() => ({
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
}));

// ----------------------------------------------------------------------

export default function Page404() {
  const theme = useTheme();
  return (
    <RootStyle>
      <Typography
        variant='h4'
        color='text.primary'>
        404 Page Not Found{' '}
      </Typography>

      <Button
        to='/'
        size='large'
        variant='contained'
        component={RouterLink}>
        Go to Home
      </Button>
    </RootStyle>
  );
}
