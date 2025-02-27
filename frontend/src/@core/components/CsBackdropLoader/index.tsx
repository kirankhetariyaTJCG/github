// React Imports
import React from 'react';

// MUI Imports
import Backdrop from '@mui/material/Backdrop';
import type { BackdropProps } from '@mui/material/Backdrop';


const CustomBackdrop = ({ open, onClick, color, ...restProps }: BackdropProps & { color?: string }) => {
  return (
    <Backdrop {...restProps} open={open} onClick={onClick} sx={{ zIndex: 9999, bgcolor: 'transparent !important' }} />
  );
};

export default CustomBackdrop;
