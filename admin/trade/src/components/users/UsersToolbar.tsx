/** @format */

import { GAP } from '@/constants';
import { matchRuleExpl } from '@/utils';
import { Box, Button, ButtonGroup, Grow } from '@mui/material';
import * as React from 'react';
import { useMatches } from 'react-router-dom';
import { TransactionCreate } from '../transaction';

const UsersToolbar: React.FC = () => {
  const matches = useMatches();
  const pathname = matches[matches.length - 1].pathname;
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      gap={GAP}
    >
      <ButtonGroup
        variant="outlined"
        aria-label="outlined primary button group"
      >
        <Button>Create Profile</Button>
        {matchRuleExpl(pathname, '*/profiles/*') && (
          <Grow in={matchRuleExpl(pathname, '*/profiles/*')}>
            <Button>Add Account</Button>
          </Grow>
        )}
        {matchRuleExpl(pathname, '*/accounts/*') && (
          <Grow in={matchRuleExpl(pathname, '*/accounts/*')}>
            <Button>Create Portfolio</Button>
          </Grow>
        )}
        {matchRuleExpl(pathname, '*/portfolios/*') && (
          <Grow
            in={matchRuleExpl(pathname, '*/portfolios/*')}
            exit={!matchRuleExpl(pathname, '*/portfolios/*')}
          >
            <Button>Add Crypto</Button>
          </Grow>
        )}
      </ButtonGroup>
      {matchRuleExpl(pathname, '*/profiles/*') && (
        <Grow in={matchRuleExpl(pathname, '*/profiles/*')}>
          <Button variant="contained">Create Transaction</Button>
        </Grow>
      )}
    </Box>
  );
};

export default UsersToolbar;
