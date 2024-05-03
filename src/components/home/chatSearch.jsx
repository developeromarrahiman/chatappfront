import * as React from 'react';
import {
  TextField,
  InputAdornment,
  Typography,
  Stack,
  CardActionArea,
  Box,
  Avatar,
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import SearchIcon from '@mui/icons-material/Search';
// react-query
import { useMutation } from 'react-query';
// api
import * as api from '../../services';

function sleep(duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

export default function ChatBox({ handleChangeSearchVal }) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState('');
  const { mutate, isLoading } = useMutation('search', api.searchUser, {
    onSuccess: (data) => {
      setLoading(false);
      setOptions(data.data);
    },
  });
  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);
  React.useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setLoading(true);
      mutate(search);
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);
  console.log(options, 'options');

  return (
    <Autocomplete
      id="country-select-demo"
      sx={{ width: '100%' }}
      options={options}
      autoHighlight
      onChange={(e, v) => {
        handleChangeSearchVal(v);
      }}
      getOptionLabel={(option) => option.name}
      renderOption={(props, option) => (
        <Box component="li" {...props}>
          {option?.image ? (
            <Avatar
              src={option?.image?.url}
              alt="avatar"
              sx={{ width: 32, height: 32, mr: 1 }}
            />
          ) : (
            <Avatar sx={{ width: 32, height: 32, mr: 1 }}>
              {option.name.slice(0, 1).toUpperCase()}
            </Avatar>
          )}

          <Typography variant="body2">{option.name}</Typography>
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          variant="standard"
          {...params}
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
          size="small"
          sx={{
            '& .MuiInputBase-root': {
              height: 61,
            },
            input: {
              p: '14px!important',
            },
          }}
        />
      )}
    />
    // <Autocomplete
    //   id="asynchronous-demo"
    //   fullWidth
    //   open={open}
    //   onOpen={() => {
    //     setOpen(true);
    //   }}
    //   onClose={() => {
    //     setOpen(false);
    //   }}
    //   onChange={(e, v) => {
    //     handleChangeSearchVal(v);
    //   }}
    //   onInputChange={(e) => {
    //     setSearch(e.target.value);
    //   }}
    //   sx={{
    //     '.MuiIconButton-root': {
    //       display: 'none',
    //     },
    //   }}
    //   autoHighlight
    //   isOptionEqualToValue={(option, value) => option.name === value.name}
    //   getOptionLabel={(option) => option.name}
    //   renderOption={(props, option) => (
    //     <>
    //       <Stack
    //         direction="row"
    //         spacing={1}
    //         alignItems="center"
    //         px={1}
    //         mb={1}
    //         sx={{
    //           cursor: 'pointer',
    //         }}
    //         component="li"
    //       >
    //         {option.image ? (
    //           <Avatar
    //             src={option?.image?.url}
    //             alt="avatar"
    //             sx={{ width: 32, height: 32 }}
    //           />
    //         ) : (
    //           <Avatar sx={{ width: 32, height: 32 }}>
    //             {option.name.slice(0, 1).toUpperCase()}
    //           </Avatar>
    //         )}

    //         <Typography variant="body2">{option.name}</Typography>
    //       </Stack>
    //     </>
    //   )}
    //   options={options}
    //   loading={loading}
    //   renderInput={(params) => (
    //     <TextField
    //       {...params}
    //       fullWidth
    //       size="small"
    //       placeholder="Search"
    //       InputProps={{
    //         ...params.InputProps,
    //         endAdornment: (
    //           <React.Fragment>
    //             {loading ? (
    //               <CircularProgress color="inherit" size={20} />
    //             ) : null}
    //             {params.InputProps.endAdornment}
    //           </React.Fragment>
    //         ),
    //         startAdornment: (
    //           <InputAdornment position="start">
    //             <SearchIcon />
    //           </InputAdornment>
    //         ),
    //       }}
    //       sx={{
    //         fieldset: {
    //           border: 'none',
    //         },
    //         input: {
    //           p: '4.5px 14px',
    //         },
    //         '& .MuiInputBase-root': {
    //           py: '2px !important',
    //         },
    //       }}
    //     />
    //   )}
    // />
  );
}
