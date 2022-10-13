/** @format */

import { templates } from '@/constants';
import { ArrowDropDown } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Button,
  ButtonGroup,
  ClickAwayListener,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from '@mui/material';
import * as React from 'react';
import TemplateForm from './TemplateForm';

/**
 *
 * renders the list of templates
 * @returns
 */

// get accounts
// accounts get fiat or crypto accounts, but always has custodyId account too :)
const TemplateMenu: React.FC = () => {
  // template form dialog box
  const [isTemplateFormOpen, setTemplateForm] = React.useState(false);

  // state stuff
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleClick = () => {
    setTemplateForm(true);
  };

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }
    setOpen(false);
  };

  const handleTemplateClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  console.log(templates);

  return (
    <React.Fragment>
      <ButtonGroup
        variant="contained"
        ref={anchorRef}
        aria-label="tranasction button"
      >
        <Button onClick={handleClick} size="small">
          {templates[selectedIndex].name}
        </Button>
        <Button
          size="small"
          aria-controls={open ? 'transaction-template-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aira-label="select-transaction-templates"
          aira-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDown />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{ zIndex: 1, minWidth: 200 }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="transaction-template-menu" autoFocusItem>
                  {templates.map((option, index) => (
                    <MenuItem
                      key={option.id}
                      selected={index === selectedIndex}
                      onClick={(e) => handleTemplateClick(e, index)}
                    >
                      {option.name}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
      <Dialog
        open={isTemplateFormOpen}
        onClose={() => setTemplateForm(false)}
        aria-labelledby="template-form-title"
        aria-describedby="template-description"
      >
        <DialogTitle id="template-form-title">
          {templates[selectedIndex].name}
        </DialogTitle>
        <Divider sx={{ mb: 1 }} />
        <DialogContent>
          <TemplateForm
            name={templates[selectedIndex].name}
            data={templates[selectedIndex].inputs}
          />
        </DialogContent>
        <DialogActions>
          <LoadingButton variant="contained" loading={false}>
            Submit
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default TemplateMenu;
