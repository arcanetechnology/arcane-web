/** @format */

import { StakeholderCryptoAccount } from '@/types/backend';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { GridColumns, DataGrid } from '@mui/x-data-grid';
import * as React from 'react';
import { NoRowsOverlays } from '../overlays';

type CryptoListProps = {
  cryptos: Array<StakeholderCryptoAccount>;
};

const CryptoList: React.FC<CryptoListProps> = ({ cryptos }) => {
  const columns = React.useMemo<GridColumns<StakeholderCryptoAccount>>(
    () => [
      {
        field: 'id',
        headerName: 'ID',
        flex: 0.5,
        minWidth: 50,
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
        field: 'balance',
        headerName: 'Balance',
        flex: 1,
        minWidth: 100,
      },
      {
        field: 'custodyAccountId',
        headerName: 'Custody Account ID',
        flex: 1,
        minWidth: 100,
      },
    ],
    [cryptos]
  );
  return (
    <DataGrid
      hideFooter
      rowSpacingType="margin"
      rows={cryptos}
      autoHeight
      components={{
        NoRowsOverlay: () => {
          return (
            <NoRowsOverlays>
              <Typography gutterBottom variant="subtitle1">
                Portfolio has no crypto accounts
              </Typography>
            </NoRowsOverlays>
          );
        },
      }}
      columns={columns}
    />
  );
};

export default CryptoList;
