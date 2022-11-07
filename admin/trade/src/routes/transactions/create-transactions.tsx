/** @format */

import { OperationList, TransactionForm } from '@/components';
import { accounts, GAP } from '@/constants';
import {
  useGetAccountsQuery,
  useGetCryptoAccountsQuery,
  useTransactionMutation,
} from '@/services';
import { AccountPath, Currency, Operation, ProfilePath } from '@/types';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box } from '@mui/material';
import { Stack } from '@mui/system';
import * as React from 'react';
import { useParams } from 'react-router-dom';

const ADD_OPERATION = 'ADD_OPERATION';
const DELETE_OPERATION = 'DELETE_OPERATION';

interface TransactionAction {
  type: typeof ADD_OPERATION | typeof DELETE_OPERATION;
  payload: { operation: Operation; currency: string | null };
}

interface TransactionState {
  operations: Operation[];
  currency: string | null;
}

const initialState: TransactionState = {
  operations: [],
  currency: null,
};

const transactionReducer = (
  state = initialState,
  action: TransactionAction,
) => {
  switch (action.type) {
    case 'ADD_OPERATION':
      return {
        operations: [...state.operations, action.payload.operation],
        currency: action.payload.currency ?? null,
      };
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

  const [state, dispatch] = React.useReducer<
    React.Reducer<TransactionState, TransactionAction>
  >(transactionReducer, initialState);

  const submitTransaction = (data: Operation, currency: string | null) => {
    dispatch({
      type: 'ADD_OPERATION',
      payload: { operation: data, currency: currency ?? null },
    });
  };

  // TODO: submit transaction connection with submit transaction

  const getAccountsList = () => {
    if (state.operations.length > 0) {
      return [...accounts, ...cryptos]
        .filter((a) => a.currency === state.currency)
        .filter((a) => !state.operations.some((o) => a.id === o.accountId));
    }
    return [...accounts, ...cryptos];
  };

  React.useEffect(() => {},  [state]);

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
        accounts={getAccountsList()}
      />
      <OperationList operations={state.operations} />
    </Stack>
  );
};

export default CreateTransactions;

// TODO: get virtual account data dropdown
