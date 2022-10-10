/** @format */

import { ProfileItem } from '@/types';
import { RemoveRedEye } from '@mui/icons-material';
import { LinearProgress, Typography } from '@mui/material';
import {
  DataGrid,
  GridCellModesModel,
  GridCellParams,
  GridColumns,
} from '@mui/x-data-grid';
import * as React from 'react';
import { GridLinkAction } from '../navigation';
import { NoRowsOverlays } from '../overlays';

type ProfileListProps = {
  profiles: Array<ProfileItem>;
  isLoading: boolean;
};

const ProfileList: React.FC<ProfileListProps> = ({ profiles, isLoading }) => {
  const [cellModesModel, setCellModesModel] =
    React.useState<GridCellModesModel>({});
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

  const handleCellClick = React.useCallback((params: GridCellParams) => {
    setCellModesModel((prevModel) => {
      console.log(params);
      console.log(prevModel);
      return {};
    });
  }, []);

  const handleCellModesModelChange = React.useCallback(
    (newModel: GridCellModesModel) => {
      console.log(newModel);
      setCellModesModel(newModel);
    },
    [],
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
      editMode="cell"
      cellModesModel={cellModesModel}
      onCellModesModelChange={handleCellModesModelChange}
      onCellClick={handleCellClick}
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
