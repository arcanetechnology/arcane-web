/** @format */

import { TransactionForm, ListTransaction } from '@/components';
import { GAP } from '@/constants';
import { useTransactionMutation } from '@/services';
import { Operation } from '@/types';
import { Stack } from '@mui/system';
import * as React from 'react';

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
    case 'DELETE_OPERATION':
      return [];
    default:
      return state;
  }
};

const CreateTransactions: React.FC = () => {
  const [transact, { data, isLoading }] = useTransactionMutation();

  const [state, dispatch] = React.useReducer(transactionReducer, initialState);

  // TODO: get the state to hold list of operations
  // TODO: function to find the custody Id

  const getCustodyId = () => {};
  return (
    <Stack gap={GAP}>
      <TransactionForm />
      {state.map((d) => (
        <h1>{d.accountId}</h1>
      ))}
    </Stack>
  );
};

export default CreateTransactions;
