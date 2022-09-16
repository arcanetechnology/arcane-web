/** @format */

import { AccountBalance } from '@mui/icons-material';
import { TextField, Typography } from '@mui/material';
import { nanoid } from '@reduxjs/toolkit';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { transactionAdded, useTradeDispatch } from '@/state';
import { UserTransaction } from '@/types';
import Action from '../action/Action';

const CreateTransaction: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useTradeDispatch();
  const handleFormSubmit = (data: FormSchema) => {
    const status = dispatch(
      transactionAdded({
        id: nanoid(),
        name: data.name,
        groups: [],
        status: 'draft',
      })
    );
    navigate(status.payload.id);
  };

  return (
    <Action
      label={
        <>
          <AccountBalance sx={{ mr: 1 }} />
          Create Transaction (⌘ + ↩)
        </>
      }
    >
      {(_) => <TransactionForm submitTransaction={handleFormSubmit} />}
    </Action>
  );
};

export default CreateTransaction;

type FormSchema = Pick<UserTransaction, 'name'>;

type TransactionFormProps = {
  submitTransaction: (data: FormSchema) => void;
};

const TransactionForm: React.FC<TransactionFormProps> = ({
  submitTransaction,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    defaultValues: { name: '' },
  });

  const onSubmit = (data: FormSchema) => submitTransaction(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        fullWidth
        placeholder="Transaction Name"
        margin="normal"
        inputProps={{ style: { fontSize: 30 } }} // font size of input text
        InputLabelProps={{ style: { fontSize: 30 } }} // fon
        id="name"
        {...register('name', {
          required: true,
        })}
      />
    </form>
  );
};
