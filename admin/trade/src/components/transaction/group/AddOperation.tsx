/** @format */

import { PointOfSale } from '@mui/icons-material';
import Operation from './Operation';
import * as React from 'react';
import {
  useTradeDispatch,
  operationAdded,
  currencyGroupOperationAdded,
} from '@/state';
import { Operation as Operationtype } from '@/types';
import { toast } from 'react-toastify';
import Action from '../../action/Action';
import { nanoid } from '@reduxjs/toolkit';
import { useGroupData } from '@/hooks';
import { useGetAllAccountOptionsQuery } from '@/services';
import { getAccount, getAccountOptions } from '@/utils';

type AddOperationProps = {
  groupId: string;
  userId: string;
};

const AddOperation: React.FC<AddOperationProps> = ({ groupId, userId }) => {
  const dispatch = useTradeDispatch();
  const { operations, group } = useGroupData(groupId);

  const { data: accountOptions, error } = useGetAllAccountOptionsQuery(userId);

  // do not let them add operation if they dont have any accounts
  if (error) {
    return null;
  }

  const submitOperation = (data: Omit<Operationtype, 'id'>) => {
    try {
      const account = getAccount(accountOptions ?? [], data.account);
      const o = dispatch(operationAdded({ id: nanoid(), ...data }));
      const c = dispatch(
        currencyGroupOperationAdded({
          id: groupId,
          operation: o.payload.id,
          currency: account.currency,
        })
      );
      toast('new operation added', {
        hideProgressBar: true,
      });
    } catch (err) {
      toast('some error in creating operation');
    }
  };
  return (
    <Action
      label={
        <>
          <PointOfSale sx={{ mr: 1 }} />
          Add Operation (⌘ + ↩)
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
            group?.currency,
            operations.map((o) => o.account)
          )}
        />
      )}
    </Action>
  );
};

export default AddOperation;
