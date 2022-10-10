/** @format */

import { PortfolioItem } from '@/types';
import { RemoveRedEye } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { DataGrid, GridColumns } from '@mui/x-data-grid';
import * as React from 'react';
import { GridLinkAction } from '../navigation';
import { NoRowsOverlays } from '../overlays';

type PortfolioListProps = {
  portfolios: Array<PortfolioItem>;
};

const PortfolioList: React.FC<PortfolioListProps> = ({ portfolios }) => {
  const columns = React.useMemo<GridColumns<PortfolioItem>>(
    () => [
      {
        field: 'id',
        headerName: 'ID',
        flex: 0.5,
        minWidth: 50,
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
            to={params.id + '/cryptos'}
            label="View"
          />,
        ],
      },
    ],
    [portfolios],
  );

  return (
    <DataGrid
      hideFooter
      rowSpacingType="margin"
      rows={portfolios}
      components={{
        NoRowsOverlay: () => {
          return (
            <NoRowsOverlays>
              <Typography gutterBottom variant="subtitle1">
                User has no Profiles
              </Typography>
            </NoRowsOverlays>
          );
        },
      }}
      autoHeight
      columns={columns}
    />
  );
};

export default PortfolioList;
