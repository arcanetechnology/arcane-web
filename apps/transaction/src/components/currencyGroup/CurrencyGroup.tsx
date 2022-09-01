/** @format */

import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Card,
  Button,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import * as React from 'react';
import {
  CurrencyGroup as CurrencyGroupType,
  Operation as OperationType,
} from '../../types';
import { useSelector } from 'react-redux';
import {
  accountsSelector,
  currencyGroupOperationAdded,
  getAccountOptions,
  operationAdded,
  useTransactionDispatch,
} from '../../state';
import { Operation } from '../operation';
import CurrencyGroupOperation from './CurrencyGroupOperation';
import { toast } from 'react-toastify';
import { nanoid } from '@reduxjs/toolkit';

const CurrencyGroup: React.FC<CurrencyGroupType> = ({
  currency,
  operations,
  id,
}) => {
  const [showOperationForm, setOperationForm] = React.useState(false);
  const accounts = useSelector(accountsSelector.selectAll);
  const dispatch = useTransactionDispatch();

  const handleOpen = () => setOperationForm(true);
  const handleClose = () => setOperationForm(false);

  const submitOperation = (data: Omit<OperationType, 'id' | 'status'>) => {
    try {
      const operation = nanoid();
      dispatch(operationAdded({ id: operation, status: 'added', ...data }));
      dispatch(currencyGroupOperationAdded({ id, operation }));
      toast('new currency group is created!', {
        hideProgressBar: true,
      });
    } catch (err) {
      toast('some error in creating operation');
    } finally {
      handleClose();
    }
  };

  return (
    <Card variant="outlined" sx={{ mt: 2 }}>
      <Accordion elevation={0}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="currency-group"
          id="currency-group-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Currency: {currency}
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            {operations.length} Operation
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {operations.map((o) => (
            <CurrencyGroupOperation key={o} id={o} />
          ))}
          {!showOperationForm && (
            <Button variant="contained" onClick={handleOpen}>
              Add Operation
            </Button>
          )}
        </AccordionDetails>
      </Accordion>
      {showOperationForm && (
        <Operation
          currency={currency}
          submitOperation={submitOperation}
          accountOptions={getAccountOptions(accounts, currency)}
        />
      )}
    </Card>
  );
};

export default CurrencyGroup;
