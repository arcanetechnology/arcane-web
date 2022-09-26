/** @format */

import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { GAP } from '@/constants';
import { Box } from '@mui/system';
import { Button, IconButton, TextField } from '@mui/material';
import { CreatePortfolioForm } from '@/types/frontend';
import { Add } from '@mui/icons-material';

type PortfolioFormProps = {
  handleSubmit: (portfolio: CreatePortfolioForm) => void;
};

const schema = z.object({
  alias: z.string().nonempty(),
});

const PortfolioForm: React.FC<PortfolioFormProps> = ({ handleSubmit }) => {
  const {
    register,
    handleSubmit: onSubmit,
    formState: { errors },
  } = useForm<CreatePortfolioForm>({
    resolver: zodResolver(schema as any),
  });

  return (
    <Box
      component="form"
      gap={GAP}
      display="flex"
      width="100%"
      flexDirection="row"
      onSubmit={onSubmit(handleSubmit)}
      id="create-account-form"
      alignItems="center"
    >
      <TextField
        size="small"
        fullWidth
        label="New Portfolio Label"
        required
        {...register('alias')}
      />
      <IconButton size="large" type="submit">
        <Add />
      </IconButton>
    </Box>
  );
};

export default PortfolioForm;
