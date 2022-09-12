/** @format */

import * as React from 'react';
import { CreateTransaction, TransactionList } from '../../../components';

const Transactions: React.FC = () => {
  return (
    <React.Fragment>
      <TransactionList />
      <CreateTransaction />
    </React.Fragment>
  );
};

export default Transactions;
