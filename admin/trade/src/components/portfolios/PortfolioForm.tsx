/** @format */

import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { GAP } from '@/constants';
import { Box } from '@mui/system';
import { Button, TextField } from '@mui/material';
import { CreatePortfolioForm } from '@/types/frontend';

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
      flexDirection="column"
      onSubmit={onSubmit(handleSubmit)}
      id="create-account-form"
    >
      <TextField label="Alias" required {...register('alias')} />
      <Box display="flex" flexDirection="row" gap={GAP}>
        <Button variant="contained" type="submit">
          Submit
        </Button>
        <Button type="reset">Reset</Button>
      </Box>
    </Box>
  );
};

export default PortfolioForm;
