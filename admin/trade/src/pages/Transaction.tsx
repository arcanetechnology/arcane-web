/** @format */

import * as React from 'react';
import { useTradeDispatch, fetchUserAccounts } from '../state';
import { toast } from 'react-toastify';
import { OperationModal, CurrencyGroups } from '../components';

const Transaction: React.FC = () => {
  const dispatch = useTradeDispatch();
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
