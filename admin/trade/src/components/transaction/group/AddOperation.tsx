/** @format */

import { PointOfSale } from '@mui/icons-material';
import Operation from './Operation';
import * as React from 'react';
import {
  getAccountOptions,
  useTradeDispatch,
  operationAdded,
  getAccount,
  currencyGroupOperationAdded,
} from '../../../state';
import { Operation as Operationtype } from '../../../types';
import { toast } from 'react-toastify';
import Action from '../../action/Action';
import { nanoid } from '@reduxjs/toolkit';
import { useGroupData } from '../../../hooks';

type AddOperationProps = {
  groupId: string;
};

const AddOperation: React.FC<AddOperationProps> = ({ groupId }) => {
  const dispatch = useTradeDispatch();
  const { accounts, operations, group } = useGroupData(groupId);
  const submitOperation = (data: Omit<Operationtype, 'id'>) => {
    try {
      const account = getAccount(accounts, data.account);
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
            accounts,
            group?.currency,
            operations.map((o) => o.account)
          )}
        />
      )}
    </Action>
  );
};

export default AddOperation;
