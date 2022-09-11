/** @format */

import * as React from 'react';
import { CreateTransaction, TransactionList } from '../../components';
import { toast } from 'react-toastify';
import { useTradeDispatch, fetchUserAccounts } from '../../state';

const Transactions: React.FC = () => {
  const dispatch = useTradeDispatch();
  // Fetch accounts as soon as transaction app is loaded
  React.useEffect(() => {
    toast('fetching user accounts', { hideProgressBar: true, autoClose: 60 });
    dispatch(fetchUserAccounts('user1'));
  }, []);
  return (
    <React.Fragment>
      <TransactionList />
      <CreateTransaction />
    </React.Fragment>
  );
};

export default Transactions;
