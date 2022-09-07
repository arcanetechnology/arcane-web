/** @format */

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';
import {
  accountsSelector,
  operationsSelector,
  RootState,
} from '../../../state';

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

type BasicTableProps = {
  operations: Array<string>;
};

const BasicTable: React.FC<BasicTableProps> = ({ operations }) => {
  const operationDatas = useSelector((s: RootState) => {
    return operationsSelector
      .selectAll(s)
      .filter((o) => operations.includes(o.account));
  });

  const accounts = useSelector(accountsSelector.selectAll);

  return (
    <TableContainer component={Paper} elevation={0}>
      <Table
        sx={{ minWidth: 650 }}
        aria-label="currency group operations"
        padding="normal"
        size="small"
      >
        <TableHead>
          <TableRow>
            <TableCell>Label</TableCell>
            <TableCell align="right">Account ID</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Balance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {operationDatas.map((o) => (
            <TableRow
              key={o.account}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {accounts.find((a) => a.id === o.account)?.label}
              </TableCell>
              <TableCell align="right">{o.account}</TableCell>
              <TableCell align="right">{o.amount}</TableCell>
              <TableCell align="right">
                {accounts.find((a) => a.id === o.account)?.balance}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BasicTable;
