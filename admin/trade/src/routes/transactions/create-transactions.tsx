/** @format */

import { OperationList, TransactionForm } from '@/components';
import { GAP } from '@/constants';
import {
  useGetAccountsQuery,
  useGetCryptoAccountsQuery,
  useTransactionMutation,
} from '@/services';
import { AccountPath, Operation, ProfilePath } from '@/types';
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

/**
 * Should be shown profile level and up.
 * @returns
 */
const CreateTransactions: React.FC = () => {
  const { userId, profileId } = useParams<ProfilePath>();

  // get fiat accounts for this profile.
  const {
    data: accounts = [],
    isLoading,
    isError,
    isFetching,
  } = useGetAccountsQuery({ userId, profileId } as ProfilePath);

  // get crypto accounts for this profile
  const {
    data: cryptos = [],
    isLoading: isCryptosLoading,
    isFetching: isCryptoFetching,
  } = useGetCryptoAccountsQuery({ userId, profileId } as ProfilePath);

  const [transact, { data, isLoading: transactLoading }] =
    useTransactionMutation();

  const [state, dispatch] = React.useReducer(transactionReducer, initialState);

  const submitTransaction = (data: Operation) => {
    dispatch({ type: 'ADD_OPERATION', payload: data });
  };

  // TODO: submit transaction connection with submit transaction
  // TODO: filter out the accounts depending on the operation accountId we got (I meant the currency type.)
  return (
    <Stack gap={GAP}>
      <Box>
        {/* <LoadingButton
          variant="contained"
          loading={isLoading}
          id="submit-transaction"
        >
          Submit Transaction
        </LoadingButton> */}
      </Box>
      <TransactionForm
        isLoading={
          isLoading || isFetching || isCryptosLoading || isCryptoFetching
        }
        submitTransaction={submitTransaction}
        accounts={[...accounts, ...cryptos]}
      />
      <OperationList operations={state} />
    </Stack>
  );
};

export default CreateTransactions;

// TODO: get virtual account data dropdown
