/** @format */

import { Fab, Modal, Box } from '@mui/material';
import { PointOfSale } from '@mui/icons-material';
import Operation from './Operation';
import * as React from 'react';
import {
  accountsSelector,
  getAccountOptions,
  useTransactionDispatch,
  operationAdded,
  currencyGroupAdded,
  getAccount,
  currencyGroupsSelector,
  operationsSelector,
} from '../../../state';
import { useSelector } from 'react-redux';
import { Operation as Operationtype } from '../../../types';
import { toast } from 'react-toastify';
import { useEventListener } from '../../../hooks';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow: 24,
  p: 1,
};

const OperationModal = () => {
  const [open, setOpen] = React.useState(false);
  // get all accounts present
  const accounts = useSelector(accountsSelector.selectAll);
  // get all currencyGroups for the transaction
  const currencyGroup = useSelector(currencyGroupsSelector.selectAll);
  // get all operations in this transaction
  const operations = useSelector(operationsSelector.selectAll);

  const dispatch = useTransactionDispatch();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const submitOperation = (data: Omit<Operationtype, 'status'>) => {
    try {
      const account = getAccount(accounts, data.account);
      dispatch(operationAdded({ status: 'added', ...data }));
      dispatch(
        currencyGroupAdded({
          operations: [data.account],
          currency: account.currency,
        })
      );
      toast('new currency group is created!', {
        hideProgressBar: true,
      });
    } catch (err) {
      toast('some error in creating operation');
    } finally {
      handleClose();
    }
  };

  useEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.metaKey) {
      setOpen(!open);
    }
  });

  return (
    <React.Fragment>
      <Fab
        onClick={handleOpen}
        variant="extended"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        color="primary"
        aria-label="add new operation"
      >
        <PointOfSale sx={{ mr: 1 }} />
        Add Group (⌘ + ↩)
      </Fab>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="add new operation"
        aria-describedby="create new operation modal"
      >
        <Box sx={style}>
          <Operation
            submitOperation={submitOperation}
            accountOptions={getAccountOptions(
              accounts,
              null,
              operations.map((o) => o.account),
              currencyGroup.map((c) => c.currency)
            )}
          />
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default OperationModal;
