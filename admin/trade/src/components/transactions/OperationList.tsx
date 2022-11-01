/** @format */

import { Operation } from '@/types';
import { Box } from '@mui/system';
import { Button, LinearProgress, Typography } from '@mui/material';
import { DataGrid, GridColumns } from '@mui/x-data-grid';
import * as React from 'react';
import { NoRowsOverlays } from '../overlays';

type OperationListProps = {
  operations: Operation[];
};
const OperationList: React.FC<OperationListProps> = ({ operations }) => {
  const columns = React.useMemo<GridColumns<Operation>>(
    () => [
      {
        field: 'accountId',
        headerName: 'Account ID',
        flex: 0.5,
        minWidth: 50,
      },
      {
        field: 'amount',
        headerName: 'Amount',
        flex: 1,
        minWidth: 100,
      },
    ],
    [operations],
  );

  return (
    <DataGrid
      hideFooter
      rowSpacingType="margin"
      rows={operations}
      components={{
        LoadingOverlay: LinearProgress,
        NoRowsOverlay: () => {
          return (
            <NoRowsOverlays>
              <Typography variant="subtitle1">No Operations</Typography>
            </NoRowsOverlays>
          );
        },
      }}
      autoHeight
      getRowId={(r) => r.accountId}
      columns={columns}
    />
  );
};

export default OperationList;
