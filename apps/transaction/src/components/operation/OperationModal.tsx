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
} from '../../state';
import { useSelector } from 'react-redux';
import { Operation as Operationtype } from '../../types';
import { toast } from 'react-toastify';
import { nanoid } from '@reduxjs/toolkit';

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
  const accounts = useSelector(accountsSelector.selectAll);
  const dispatch = useTransactionDispatch();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const submitOperation = (data: Omit<Operationtype, 'id' | 'status'>) => {
    try {
      const account = getAccount(accounts, data.account);
      const id = nanoid();
      const sectionId = nanoid();
      dispatch(operationAdded({ id, status: 'added', ...data }));
      dispatch(
        currencyGroupAdded({
          id: sectionId,
          operations: [id],
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
        Add New Operation
      </Fab>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="add new operation"
        aria-describedby="create new operation modal"
      >
        <Box sx={style}>
          <Operation
            currency={null}
            submitOperation={submitOperation}
            accountOptions={getAccountOptions(accounts)}
          />
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default OperationModal;
