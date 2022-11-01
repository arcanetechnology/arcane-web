/** @format */

import { OperationList, TransactionForm } from '@/components';
import { GAP } from '@/constants';
import { useTransactionMutation } from '@/services';
import { AccountPath, Operation } from '@/types';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box } from '@mui/material';
import { Stack } from '@mui/system';
import * as React from 'react';
import { useParams } from 'react-router-dom';

const ADD_OPERATION = 'ADD_OPERATION';
const DELETE_OPERATION = 'DELETE_OPERATION';

interface TransactionAction {
  type: typeof ADD_OPERATION | typeof DELETE_OPERATION;
  payload: Operation;
}

const initialState: Operation[] = [];

const transactionReducer = (
  state = initialState,
  action: TransactionAction,
) => {
  switch (action.type) {
    case 'ADD_OPERATION':
      return [...state, action.payload];
    default:
      return state;
  }
};

const CreateTransactions: React.FC = () => {
  const params = useParams<AccountPath>();

  console.log('params context');
  console.log(params);

  // TODO: depending on the params that are available, get that data.

  const [transact, { data, isLoading }] = useTransactionMutation();

  const [state, dispatch] = React.useReducer(transactionReducer, initialState);

  // TODO: function to find the custody Id

  const getCustodyId = () => {};

  const submitTransaction = (data: Operation) => {
    dispatch({ type: 'ADD_OPERATION', payload: data });
  };

  // TODO: submit transaction connection with submit transaction

  return (
    <Stack gap={GAP}>
      <Box>
        <LoadingButton
          variant="contained"
          loading={isLoading}
          id="submit-transaction"
        >
          Submit Transaction
        </LoadingButton>
      </Box>
      <TransactionForm submitTransaction={submitTransaction} />
      <OperationList operations={state} />
    </Stack>
  );
};

export default CreateTransactions;

// TODO: get virtual account data dropdown
// TODO; get crypto account data dropdown
// TODO: get fiat account data dropdown
