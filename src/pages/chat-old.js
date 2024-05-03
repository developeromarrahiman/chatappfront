import { Box } from '@mui/material';
import * as React from 'react';
import UserSidebar from '../components/home/usersSidbar';
import Home from '../components/home';
import { useQuery } from 'react-query';
import * as api from '../services';
import { useSearchParams } from 'react-router-dom';

export default function App() {
  const [showIcon, setShowIcon] = React.useState();
  // const [id, setId] = React.useState(null);
  // let [searchParams] = useSearchParams();

  const handleChangeshow = () => {
    setShowIcon(!showIcon);
  };
  const [selectedValue, setSelectedValue] = React.useState(null);
  const handleChangeSearchVal = (newAge) => {
    setSelectedValue(newAge);
  };

  const { data } = useQuery(['get-chat-list'], () => api.getChatList());
  // React.useEffect(() => {
  //   const uid = searchParams.get('uid');
  //   setId(uid);
  // }, [searchParams]);

  return (
    <>
      <Box
      // sx={{ px: { md: 10, xs: 0 } }}
      >
        <Box
          sx={{
            display: 'flex',
            bgcolor: '#f0f0f0',
            width: '100%',
            height: '100%',
            // height: { md: '89vh', xs: '88vh' },
            overflow: 'hidden',
          }}
        >
          <Box sx={{ display: { md: 'flex ', xs: 'none' } }}>
            <UserSidebar
              handleChangeshow={handleChangeshow}
              listData={
                selectedValue ? [selectedValue, ...data?.data] : data?.data
              }
              chatId={selectedValue?._id}
            />
          </Box>
          <Home
            selectedValue={selectedValue}
            showIcon={showIcon}
            // chatId={selectedValue?._id}
            handleChangeSearchVal={handleChangeSearchVal}
          />
        </Box>
      </Box>
    </>
  );
}
