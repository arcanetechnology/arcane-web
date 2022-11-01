/** @format */

import { GAP } from '@/constants';
import { Operation, OperationForm } from '@/types';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import * as React from 'react';

const schema = z.object({
  accountId: z.string().nonempty(),
  amount: z.number(),
});

type TransactionFormProps = {
  submitTransaction: (data: Operation) => void;
};

const TransactionForm: React.FC<TransactionFormProps> = ({
  submitTransaction,
}) => {
  // TODO: add react-hook-forms here

  const {
    register,
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
        <TextField
          label="Acount ID"
          {...register('accountId')}
          error={Boolean(errors['accountId'])}
          helperText={errors['accountId']?.message}
        />
        <TextField
          label="Amount"
          {...register('amount', { valueAsNumber: true })}
          error={Boolean(errors['amount'])}
          helperText={errors['amount']?.message}
        />
        <Button type="submit">Add</Button>
      </Box>
    </Box>
  );
};

export default TransactionForm;
