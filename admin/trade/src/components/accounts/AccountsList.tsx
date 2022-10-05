/** @format */

import { StakeholderFiatAccountItem } from '@/types/backend';
import { Button, LinearProgress, Typography } from '@mui/material';
import { DataGrid, GridColumns } from '@mui/x-data-grid';
import * as React from 'react';
import { NoRowsOverlays } from '../overlays';

type AccountsListProps = {
  accounts: Array<StakeholderFiatAccountItem>;
  isLoading?: boolean;
};

const AccountsList: React.FC<AccountsListProps> = ({
  accounts,
  isLoading = false,
}) => {
  const columns = React.useMemo<GridColumns<StakeholderFiatAccountItem>>(
    () => [
      {
        field: 'id',
        headerName: 'ID',
        flex: 0.5,
        minWidth: 50,
      },
      {
        field: 'balance',
        headerName: 'Balance',
        flex: 1,
        minWidth: 100,
      },
      {
        field: 'custodyAccountId',
        headerName: 'Custody Account',
        flex: 1,
        minWidth: 100,
      },
      {
        field: 'currency',
        headerName: 'Currency',
        flex: 1,
        minWidth: 100,
      },
      {
        field: 'alias',
        headerName: 'Alias',
        flex: 1,
        minWidth: 100,
      },
    ],
    [accounts],
  );
  return (
    <DataGrid
      hideFooter
      rowSpacingType="margin"
      rows={accounts}
      loading={isLoading}
      components={{
        LoadingOverlay: LinearProgress,
        NoRowsOverlay: () => {
          return (
            <NoRowsOverlays>
              <Typography variant="subtitle1">No Accounts</Typography>
            </NoRowsOverlays>
          );
        },
      }}
      autoHeight
      columns={columns}
    />
  );
};

export default AccountsList;
