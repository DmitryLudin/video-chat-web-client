import { Box } from '@mui/material';
import { Content } from 'layouts/content';
import { Header } from 'layouts/header';
import React from 'react';

function App() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Header />
      <Content />
    </Box>
  );
}

export default App;
