/** @format */

import { PointOfSale } from '@mui/icons-material';
import Operation from './Operation';
import * as React from 'react';
import {
  getAccountOptions,
  useTradeDispatch,
  operationAdded,
  currencyGroupAdded,
  getAccount,
  transactionGroupAdded,
} from '../../../state';
import { Operation as Operationtype } from '../../../types';
import { toast } from 'react-toastify';
import Action from '../../action/Action';
import { nanoid } from '@reduxjs/toolkit';
import { useTransactionData } from '../../../hooks';

type CreateGroupProps = {
  id: string;
};

const CreateGroup: React.FC<CreateGroupProps> = ({ id }) => {
  const { accounts, operations, transaction, groups } = useTransactionData(id);

  if (!transaction) {
    return null;
  }

  const dispatch = useTradeDispatch();

  const submitOperation = (data: Omit<Operationtype, 'id'>) => {
    try {
      const account = getAccount(accounts, data.account);
      const o = dispatch(operationAdded({ id: nanoid(), ...data }));
      const c = dispatch(
        currencyGroupAdded({
          id: nanoid(),
          operations: [o.payload.id],
          currency: account.currency,
        })
      );
      dispatch(transactionGroupAdded({ id, group: c.payload.id }));
      toast('new currency group is created!', {
        hideProgressBar: true,
      });
    } catch (err) {
      toast('some error in creating operation');
    }
  };

  return (
    <React.Fragment>
      <Action
        label={
          <>
            <PointOfSale sx={{ mr: 1 }} />
            Add Group (⌘ + ↩)
          </>
        }
      >
        {(handleClose) => (
          <Operation
            submitOperation={(data) => {
              submitOperation(data);
              handleClose();
            }}
            accountOptions={getAccountOptions(
              accounts,
              null,
              operations.map((o) => o.account),
              groups.map((g) => g.currency)
            )}
          />
        )}
      </Action>
    </React.Fragment>
  );
};

export default CreateGroup;
