/** @format */

import * as React from 'react';
import { Button, Dialog, DialogContent, Fab, makeStyles } from '@mui/material';
import { useEventListener } from '../../hooks';

type ActionProps = {
  children: (handleClose: () => void) => React.ReactNode;
  label: React.ReactNode;
};

const Action: React.FC<ActionProps> = ({ children, label }) => {
  const [open, setOpen] = React.useState(false);
  useEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.metaKey) {
      setOpen(!open);
    }
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        onClick={handleOpen}
        variant="contained"
        color="primary"
        aria-label="add new operation"
      >
        {label}
      </Button>
      <Dialog sx={{ height: 500 }} fullWidth open={open} onClose={handleClose}>
        <DialogContent sx={{ overflowY: 'visible' }}>
          {children(handleClose)}
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default Action;
