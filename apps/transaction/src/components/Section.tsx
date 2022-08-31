/** @format */

import { Box } from '@mui/material';
import { nanoid } from '@reduxjs/toolkit';
import * as React from 'react';
import { useSelector } from 'react-redux';
import {
  operationDeleted,
  useTransactionDispatch,
  sectionOperationDeleted,
  operationUpdated,
  accountsSelector,
  operationAdded,
  sectionOperationAdded,
} from '../state';
import { Operation as OperationType, Section as SectionType } from '../types';
import Operation from './Operation';

const Section: React.FC<SectionType> = ({ id, operations }) => {
  const accounts = useSelector(accountsSelector.selectAll);
  const dispatch = useTransactionDispatch();

  const deleteOperation = (operation: string) => {
    dispatch(operationDeleted(operation));
    dispatch(sectionOperationDeleted({ id, operation: operation }));
  };

  const updateOperation = ({ id, ...rest }: OperationType) => {
    dispatch(operationUpdated({ id, changes: { ...rest } }));
    addOperation();
  };

  const addOperation = () => {
    const operation = nanoid();
    dispatch(
      operationAdded({
        id: operation,
        status: 'draft',
        account: '',
        amount: 0,
      })
    );
    dispatch(sectionOperationAdded({ id, operation }));
  };

  return (
    <Box m={2} gap={2} flexDirection={'column'}>
      {operations.map((o) => (
        <Operation
          key={o}
          id={o}
          deleteOperation={deleteOperation}
          submitOperation={updateOperation}
          accountOptions={accounts}
        />
      ))}
    </Box>
  );
};

export default Section;
