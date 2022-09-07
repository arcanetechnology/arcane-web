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
import { toast } from 'react-toastify';
import { symbol } from '../../utils/countries';
import CurrencyTable from './CurrencyTable';

const CurrencyGroup: React.FC<CurrencyGroupType> = ({
  currency,
  operations,
}) => {
  const [showOperationForm, setOperationForm] = React.useState(false);
  const accounts = useSelector(accountsSelector.selectAll);
  const dispatch = useTransactionDispatch();

  const handleOpen = () => setOperationForm(true);
  const handleClose = () => setOperationForm(false);

  const submitOperation = (data: Omit<OperationType, 'status'>) => {
    if (operations.includes(data.account)) {
      toast('you cannot add the same account in this group', {
        hideProgressBar: true,
      });
      return;
    }

    try {
      dispatch(operationAdded({ status: 'added', ...data }));

      dispatch(
        currencyGroupOperationAdded({ currency, operation: data.account })
      );

      toast('new operation is added!', {
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
          sx={{
            alignItems: 'center',
          }}
          id="currency-group-header"
        >
          <Typography variant="h4" sx={{ flexShrink: 0 }}>
            {currency}{' '}
            <span
              dangerouslySetInnerHTML={{
                __html: symbol(currency) as unknown as string,
              }}
            ></span>
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}
        >
          <CurrencyTable operations={operations} />
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
          size="small"
          submitOperation={submitOperation}
          accountOptions={getAccountOptions(accounts, currency)}
        />
      )}
    </Card>
  );
};

export default CurrencyGroup;
