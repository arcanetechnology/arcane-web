/** @format */

import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { GAP } from '@/constants';
import { Box } from '@mui/system';
import { Button, TextField } from '@mui/material';
import { currency, CreateAccountForm } from '@/types';
import LoadingButton from '@mui/lab/LoadingButton';
import { CustodyDropDown } from '../custodies';

type AccountFormProps = {
  handleSubmit: (account: CreateAccountForm) => void;
  isLoading?: boolean;
};

const schema = z.object({
  alias: z.string().nonempty(),
  currency: z.enum(currency),
  custodyAccountId: z.string().nonempty('please specify a custodyId'),
});

const AccountForm: React.FC<AccountFormProps> = ({
  handleSubmit,
  isLoading,
}) => {
  const {
    register,
    handleSubmit: onSubmit,
    control,
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
      <Box display="flex" flexDirection="row" gap={GAP}>
        <TextField
          label="Alias"
          fullWidth
          {...register('alias')}
          error={Boolean(errors['alias'])}
          helperText={errors['alias']?.message}
        />
        <TextField
          label="Currency"
          fullWidth
          {...register('currency')}
          required
          error={Boolean(errors['currency'])}
          helperText={errors['currency']?.message}
        />
      </Box>
      <CustodyDropDown
        defaultValue={''}
        name="custodyAccountId"
        rule={{
          required: true,
        }}
        control={control}
      />

      <Box display="flex" flexDirection="row" gap={GAP}>
        <LoadingButton loading={isLoading} variant="contained" type="submit">
          Submit
        </LoadingButton>
        <Button type="reset">Reset</Button>
      </Box>
    </Box>
  );
};

export default AccountForm;
