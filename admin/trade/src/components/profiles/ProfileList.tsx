/** @format */

import { ProfileItem } from '@/types/backend';
import { RemoveRedEye } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid, GridColumns } from '@mui/x-data-grid';
import * as React from 'react';
import { Navigate } from 'react-router-dom';
import { GridLinkAction } from '../navigation';
import { NoRowsOverlays } from '../overlays';

type ProfileListProps = {
  profiles: Array<ProfileItem>;
};

const ProfileList: React.FC<ProfileListProps> = ({ profiles }) => {
  const columns = React.useMemo<GridColumns<ProfileItem>>(
    () => [
      {
        field: 'id',
        headerName: 'ID',
        flex: 0.5,
        minWidth: 50,
      },
      {
        field: 'type',
        headerName: 'Type',
        flex: 1,
        minWidth: 300,
      },
      {
        field: 'alias',
        headerName: 'Alias',
        flex: 1,
        minWidth: 300,
      },
      {
        field: 'actions',
        type: 'actions',
        flex: 1,
        getActions: (params) => [
          <GridLinkAction
            icon={<RemoveRedEye />}
            to={params.id + '/accounts'}
            label="View"
          />,
        ],
      },
    ],
    [profiles]
  );
  return (
    <DataGrid
      hideFooter
      rowSpacingType="margin"
      rows={profiles}
      components={{
        NoRowsOverlay: () => {
          return (
            <NoRowsOverlays>
              <Typography variant="subtitle1">No Profiles</Typography>
            </NoRowsOverlays>
          );
        },
      }}
      autoHeight
      columns={columns}
    />
  );
};

export default ProfileList;
