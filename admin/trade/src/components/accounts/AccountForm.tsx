/** @format */

import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { GAP } from '@/constants';
import { Box } from '@mui/system';
import { Button, TextField } from '@mui/material';

type AccountFormProps = {
  handleSubmit: () => void;
};

const AccountForm: React.FC<AccountFormProps> = ({ handleSubmit }) => {
  return (
    <Box component="form" gap={GAP} display="flex" flexDirection="column">
      <TextField label="Alais" />
      <Box display="flex" flexDirection="row" gap={GAP} width="100%">
        <TextField label="Account Number" fullWidth />
        <TextField label="Re-Enter Account Number" fullWidth />
      </Box>
      <Box display="flex" flexDirection="row" gap={GAP}>
        <TextField label="Currency" fullWidth />
        <TextField label="Balance" fullWidth />
      </Box>
      <Box display="flex" flexDirection="row" gap={GAP} width="100%">
        <TextField label="Custody Account Id" fullWidth />
      </Box>

      <Box display="flex" flexDirection="row" gap={GAP}>
        <Button variant="contained" type="submit">
          Submit
        </Button>
        <Button type="reset">Reset</Button>
      </Box>
    </Box>
  );
};

export default AccountForm;
