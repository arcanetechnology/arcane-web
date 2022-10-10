/** @format */

import { useUpdateProfileMutation } from '@/services';
import { ProfileItem, UpdateProfileForm } from '@/types';
import { RemoveRedEye } from '@mui/icons-material';
import { LinearProgress, Typography } from '@mui/material';
import {
  DataGrid,
  GridCellModesModel,
  GridCellParams,
  GridColumns,
  GridRowModel,
} from '@mui/x-data-grid';
import * as React from 'react';
import { GridLinkAction } from '../navigation';
import { NoRowsOverlays } from '../overlays';

type ProfileListProps = {
  profiles: Array<ProfileItem>;
  handleUpdate: (data: UpdateProfileForm, profileId: string) => void;
  isLoading: boolean;
};

const ProfileList: React.FC<ProfileListProps> = ({
  profiles,
  isLoading,
  handleUpdate,
}) => {
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
        editable: true,
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
    [profiles],
  );

  const processRowUpdate = React.useCallback(
    async (newRow: ProfileItem, oldRow: ProfileItem) => {
      try {
        await handleUpdate({ alias: newRow.alias }, newRow.id);
        return newRow;
      } catch (err) {
        // return old row incase the update does not happen
        return oldRow;
      }
    },
    [profiles],
  );

  return (
    <DataGrid
      getRowClassName={(params) =>
        `trade-app-profile-${params.row.type.toLowerCase()}`
      }
      hideFooter
      rowSpacingType="margin"
      loading={isLoading}
      rows={profiles}
      experimentalFeatures={{ newEditingApi: true }}
      editMode="row"
      processRowUpdate={processRowUpdate}
      components={{
        LoadingOverlay: LinearProgress,
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
