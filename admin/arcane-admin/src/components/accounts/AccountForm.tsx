/** @format */

import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { GAP } from '@/constants';
import { Box } from '@mui/system';
import { Button, TextField } from '@mui/material';
import { currency } from '@/types/backend';
import { CreateAccountForm } from '@/types/frontend';

type AccountFormProps = {
  handleSubmit: (account: CreateAccountForm) => void;
};

const schema = z.object({
  alias: z.string().nonempty(),
  currency: z.enum(currency),

  custodyAccountId: z.string().nonempty('please specify a custodyId'),
});

const AccountForm: React.FC<AccountFormProps> = ({ handleSubmit }) => {
  const {
    register,
    handleSubmit: onSubmit,
    formState: { errors },
  } = useForm<CreateAccountForm>({
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
      <TextField
        label="Alias"
        {...register('alias')}
        error={Boolean(errors['alias'])}
        helperText={errors['alias']?.message}
      />

      <Box display="flex" flexDirection="row" gap={GAP}>
        <TextField
          label="Currency"
          fullWidth
          {...register('currency')}
          required
          error={Boolean(errors['currency'])}
          helperText={errors['currency']?.message}
        />
      </Box>
      <Box display="flex" flexDirection="row" gap={GAP} width="100%">
        <TextField
          label="Custody Account Id"
          fullWidth
          {...register('custodyAccountId')}
          error={Boolean(errors['custodyAccountId'])}
          helperText={errors['custodyAccountId']?.message}
        />
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
