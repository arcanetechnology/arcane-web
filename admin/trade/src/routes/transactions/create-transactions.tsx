/** @format */

import { useTransactionMutation } from '@/services/transactions';
import * as React from 'react';

const CreateTransactions: React.FC = () => {
  const [transact, { data, isLoading }] = useTransactionMutation();

  return <h1>Create Transaction</h1>;
};

export default CreateTransactions;

// TODO: get virtual account data dropdown
// TODO; get crypto account data dropdown
// TODO: get fiat account data dropdown
