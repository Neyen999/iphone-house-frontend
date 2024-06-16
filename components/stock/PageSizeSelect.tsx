import React from 'react';
import { Select, MenuItem, FormControl, InputLabel, styled, SelectChangeEvent } from '@mui/material';

const CustomFormControl = styled(FormControl)(({ theme }) => ({
  minWidth: 120,
  margin: theme.spacing(1),
  '& .MuiInputLabel-root': {
    color: theme.palette.primary.main,
  },
  '& .MuiSelect-root': {
    color: theme.palette.secondary.main,
    '&:focus': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.light,
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.main,
  },
  '& .MuiSelect-icon': {
    color: theme.palette.primary.main,
  },
}));

const CustomSelect = styled(Select)(({ theme }) => ({
  '& .MuiSelect-select': {
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    borderRadius: 4,
    '&:focus': {
      borderRadius: 4,
      backgroundColor: theme.palette.background.paper,
    },
  },
}));

interface PageSizeSelectProps {
  pageSize: number;
  handlePageSizeChange: (event: SelectChangeEvent<unknown>) => void;
}

const PageSizeSelect: React.FC<PageSizeSelectProps> = ({ pageSize, handlePageSizeChange }) => {
  return (
    <CustomFormControl variant="outlined">
      <InputLabel id="page-size-label">Cant.</InputLabel>
      <CustomSelect
        labelId="page-size-label"
        id="page-size-select"
        value={pageSize}
        onChange={handlePageSizeChange}
        label="Size"
      >
        <MenuItem value={5}>5</MenuItem>
        <MenuItem value={10}>10</MenuItem>
      </CustomSelect>
    </CustomFormControl>
  );
};

export default PageSizeSelect;
