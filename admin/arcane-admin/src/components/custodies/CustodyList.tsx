/** @format */

import { CustodyAccount } from '@/types/backend';
import { RemoveRedEye } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid, GridColumns } from '@mui/x-data-grid';
import * as React from 'react';
import { GridLinkAction } from '../navigation';
import { NoRowsOverlays } from '../overlays';

type ProfileListProps = {
  custodies: Array<CustodyAccount>;
};

const CustodyList: React.FC<ProfileListProps> = ({ custodies }) => {
  const columns = React.useMemo<GridColumns<CustodyAccount>>(
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
      {
        field: 'actions',
        type: 'actions',
        flex: 1,
        getActions: (params) => [
          <GridLinkAction
            icon={<RemoveRedEye />}
            to={params.id as string}
            label="View"
          />,
        ],
      },
    ],
    [custodies]
  );
  return (
    <Box height={600}>
      <DataGrid
        hideFooter
        rowSpacingType="margin"
        rows={custodies}
        components={{
          NoRowsOverlay: () => {
            return (
              <NoRowsOverlays>
                <Typography gutterBottom variant="subtitle1">
                  There are no custody accounts
                </Typography>
              </NoRowsOverlays>
            );
          },
        }}
        columns={columns}
      />
    </Box>
  );
};

export default CustodyList;
