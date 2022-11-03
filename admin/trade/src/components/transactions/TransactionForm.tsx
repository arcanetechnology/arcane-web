/** @format */

import { GAP } from '@/constants';
import {
  Operation,
  OperationForm,
  StakeholderCryptoAccounts,
  StakeholderFiatAccounts,
} from '@/types';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button, IconButton, TextField } from '@mui/material';
import { Box } from '@mui/system';
import * as React from 'react';
import { AccountsAutoComplete } from '../accounts';
import { Add } from '@mui/icons-material';

const schema = z.object({
  accountId: z.string().nonempty(),
  amount: z.number(),
});

type TransactionFormProps = {
  submitTransaction: (data: Operation) => void;
  accounts: StakeholderFiatAccounts | StakeholderCryptoAccounts;
  isLoading: boolean;
};

const TransactionForm: React.FC<TransactionFormProps> = ({
  submitTransaction,
  accounts,
  isLoading = false,
}) => {
  const {
    register,
    control,
    handleSubmit: onSubmit,
    formState: { errors },
  } = useForm<OperationForm>({
    resolver: zodResolver(schema as any),
  });

  return (
    <Box
      component="form"
      onSubmit={onSubmit(submitTransaction)}
      id="create-transaction-form"
    >
      <Box display="flex" flexDirection="row" gap={GAP}>
        <AccountsAutoComplete
          isLoading={isLoading}
          accounts={accounts}
          defaultValue={''}
          name="accountId"
          rule={{
            required: true,
          }}
          control={control}
        />
        <TextField
          label="Amount"
          fullWidth
          {...register('amount', { valueAsNumber: true })}
          error={Boolean(errors['amount'])}
          helperText={errors['amount']?.message}
        />
        <IconButton type="submit" size="large">
          <Add />
        </IconButton>
      </Box>
    </Box>
  );
};

export default TransactionForm;
