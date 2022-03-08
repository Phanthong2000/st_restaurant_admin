import React from 'react';
import { Box, styled } from '@mui/material';
import { Scrollbar } from 'smooth-scrollbar-react';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex'
}));
function Home() {
  const data = [1, 2, 3, 4, 5, 6];
  return (
    <RootStyle>
      <Scrollbar alwaysShowTracks>
        {data.map((item, index) => (
          <div key={index} style={{ height: '400px' }}>
            {item}
          </div>
        ))}
      </Scrollbar>
    </RootStyle>
  );
}

export default Home;
