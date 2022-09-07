/** @format */

import * as React from 'react';
import { useTransactionDispatch, fetchUserAccounts } from '../state';
import { toast } from 'react-toastify';
import { OperationModal } from './operation';
import CurrencyGroups from './currencyGroup';

const Transaction: React.FC = () => {
  const dispatch = useTransactionDispatch();
  // Fetch accounts as soon as transaction app is loaded
  React.useEffect(() => {
    toast('fetching user accounts', { hideProgressBar: true, autoClose: 60 });
    dispatch(fetchUserAccounts('user1'));
  }, []);

  return (
    <React.Fragment>
      <CurrencyGroups />
      <OperationModal />
    </React.Fragment>
  );
};

export default Transaction;
