/** @format */

import {
  GridActionsCellItem,
  GridActionsCellItemProps,
} from '@mui/x-data-grid';
import React, { RefAttributes } from 'react';
import { Link as RouterLink } from 'react-router-dom';

type GridLinkActionProps = { to: string } & GridActionsCellItemProps &
  RefAttributes<HTMLButtonElement>;

const GridLinkAction = ({ to, ...props }: GridLinkActionProps) => {
  return (
    <RouterLink to={to}>
      <GridActionsCellItem {...props} />
    </RouterLink>
  );
};

export default GridLinkAction;
