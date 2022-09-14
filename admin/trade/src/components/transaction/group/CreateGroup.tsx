/** @format */

import { PointOfSale } from '@mui/icons-material';
import Operation from './Operation';
import * as React from 'react';
import {
  useTradeDispatch,
  operationAdded,
  currencyGroupAdded,
  transactionGroupAdded,
} from '@/state';
import { Operation as Operationtype } from '../../../types';
import { toast } from 'react-toastify';
import Action from '../../action/Action';
import { nanoid } from '@reduxjs/toolkit';
import { useTransactionData } from '@/hooks';
import {
  useGetAccountOptionsQuery,
  useGetAllAccountOptionsQuery,
} from '@/services';
import { getAccount, getAccountOptions } from '@/utils';

type CreateGroupProps = {
  id: string;
  userId: string;
};

const CreateGroup: React.FC<CreateGroupProps> = ({ id, userId }) => {
  const { operations, transaction, groups } = useTransactionData(id);
  const { data: accountOptions, error } = useGetAllAccountOptionsQuery(userId);

  if (!transaction || error) {
    return null;
  }

  const dispatch = useTradeDispatch();

  const submitOperation = (data: Omit<Operationtype, 'id'>) => {
    try {
      const account = getAccount(accountOptions ?? [], data.account);
      const o = dispatch(operationAdded({ id: nanoid(), ...data }));
      const c = dispatch(
        currencyGroupAdded({
          id: nanoid(),
          operations: [o.payload.id],
          currency: account.currency,
          total: o.payload.amount,
          custodyTotal: o.payload.amount,
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
              accountOptions ?? [],
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
