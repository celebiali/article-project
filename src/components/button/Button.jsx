import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function BasicButtons({ onClick }) {
  return (
    <Stack spacing={1} direction="row">
      <Button variant="outlined" onClick={onClick}>Gönder</Button>
    </Stack>
  );
}
