/** @format */

import { useTransactionMutation } from '@/services/transactions';
import * as React from 'react';

const CreateTransactions: React.FC = () => {
  const [transact, { data, isLoading }] = useTransactionMutation();

  React.useEffect(() => {}, [transact([{ accountId: 'random', amount: 100 }])]);
  return <h1>Create Transaction</h1>;
};

export default CreateTransactions;
