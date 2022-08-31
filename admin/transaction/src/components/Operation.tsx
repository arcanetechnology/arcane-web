/** @format */
import { Card, IconButton, CardContent, CardActions } from '@mui/material';
import * as React from 'react';
import { useSelector } from 'react-redux';
import {
  accountsSelector,
  operationAdded,
  operationCreated,
  operationsSelector,
  RootState,
  useTransactionDispatch,
} from '../state';
import OperationForm from './OperationForm';
import { Add, Delete } from '@mui/icons-material';

type OperationProps = {
  id: string;
  deleteOperation: (id: string) => void;
};

const Operation: React.FC<OperationProps> = ({ id, deleteOperation }) => {
  const operation = useSelector((s: RootState) =>
    operationsSelector.selectById(s, id)
  );
  const accounts = useSelector(accountsSelector.selectAll);

  const dispatch = useTransactionDispatch();

  if (!operation) {
    return null;
  }

  // TODO: add operation then create new operation entity. and use the operation data to create new operation

  // const addOperation = () => {
  //   dispatch(operationCreated({ id, account: '121312', amount: 100 }));
  //   // logic to add or no
  //   dispatch(operationAdded({ id: 'newId', accounts: 'filtered accounts' }));
  // };

  return (
    <Card
      sx={{ display: 'flex', mb: 2, mt: 2, justifyContent: 'space-between' }}
    >
      <CardContent>
        <OperationForm accounts={operation.accounts} />
      </CardContent>
      <CardActions>
        <IconButton>
          <Add />
        </IconButton>
        <IconButton onClick={() => deleteOperation(id)}>
          <Delete />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Operation;
