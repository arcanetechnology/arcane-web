/** @format */

import {
  currencyGroupCustodyDeleted,
  currencyGroupCustodyTotalUpdated,
  currencyGroupOperationAdded,
  currencyGroupOperationDeleted,
  currencyGroupsSelector,
  operationAdded,
  operationDeleted,
  operationsSelector,
  useTradeDispatch,
  useTradeSelector,
} from '@/state';
import {
  AccountOption,
  AccountTypes,
  Operation as OperationType,
} from '@/types';
import { getAccount, getAccountOptions } from '@/utils';
import { Delete } from '@mui/icons-material';
import {
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import { darken, Stack, Box } from '@mui/system';
import { DataGrid, GridColumns, GridActionsCellItem } from '@mui/x-data-grid';
import { nanoid } from '@reduxjs/toolkit';
import { group } from 'console';
import * as React from 'react';
import { toast } from 'react-toastify';
import Operation from './Operation';

type GroupsAndOperationsProps = {
  groups: Array<string>;
  accountOptions: Array<AccountOption>;
};

type OperationAccounts = {
  id: string;
  groupId: string;
  label: string;
  amount: number;
  account: string;
  type: AccountTypes;
};

type GroupOperationRecord = Record<string, Array<OperationAccounts>>;

const useGroupsOperationAccounts = (
  groups: Array<string>,
  accountOptions: AccountOption[]
): GroupOperationRecord => {
  const allOperations = useTradeSelector(operationsSelector.selectAll);
  return useTradeSelector((s) =>
    currencyGroupsSelector.selectAll(s).filter((g) => groups.includes(g.id))
  ).reduce((groupOperationRecord, currGroup) => {
    const groupOperations = allOperations.filter((o) =>
      currGroup.operations.includes(o.id)
    );

    const operationAccounts: Array<OperationAccounts> = groupOperations.map(
      (o) => {
        const accountOption = accountOptions.find((a) => a.id === o.account);
        return {
          id: o.id,
          groupId: currGroup.id,
          account: o.account,
          label: accountOption?.label!,
          amount: o.amount,
          type: accountOption?.type ?? 'Custody',
        };
      }
    );

    return {
      ...groupOperationRecord,
      [currGroup.currency]: operationAccounts,
    };
  }, {} as GroupOperationRecord);
};

const GroupsAndOperations: React.FC<GroupsAndOperationsProps> = ({
  groups,
  accountOptions,
}) => {
  const data = useGroupsOperationAccounts(groups, accountOptions);
  const groupTotals: Record<string, { total: number; custodyTotal: number }> =
    useTradeSelector((s) => {
      return currencyGroupsSelector
        .selectAll(s)
        .filter((g) => groups.includes(g.id))
        .reduce((t, g) => {
          return {
            ...t,
            [g.currency]: {
              total: g.total,
              custodyTotal: g.custodyTotal,
            },
          };
        }, {});
    });

  const dispatch = useTradeDispatch();

  const getColumns = (currency: string): GridColumns<OperationAccounts> => {
    const total = groupTotals[currency];
    return [
      {
        field: 'id',
        headerName: 'ID',
        minWidth: 20,
        hide: true,
      },
      {
        field: 'groupId',
        headerName: 'Group ID',
        hide: true,
      },
      {
        field: 'account',
        headerName: 'Account',
        flex: 0.5,
        minWidth: 300,
      },
      {
        field: 'label',
        headerName: 'Label',
        flex: 2,
        minWidth: 300,
      },
      {
        field: 'type',
        headerName: 'Type',
        hide: true,
      },
      {
        field: 'amount',
        headerName: 'Stakeholder Amount',

        renderHeader: (params) => {
          if (total.total !== 0) {
            params.colDef.cellClassName = 'operation--error-header';
          } else {
            params.colDef.cellClassName = 'operation--success-header';
          }

          return params.colDef.headerName + ` ( total sum ${total.total} )`;
        },
        flex: 1,
        minWidth: 300,
        renderCell: (params) => {
          return params.row.type !== 'Custody' ? params.value : '';
        },
      },
      {
        field: 'custodyAmount',
        headerName: 'Custody Amount',
        flex: 1,
        minWidth: 300,
        renderHeader: (params) => {
          if (total.custodyTotal !== 0) {
            params.colDef.cellClassName = 'operation--error-header';
          } else {
            params.colDef.cellClassName = 'operation--success-header';
          }

          return (
            params.colDef.headerName + ` ( total sum ${total.custodyTotal} )`
          );
        },
        renderCell: (params) => {
          return ['Custody', 'Virtual'].includes(params.row.type)
            ? params.row.amount
            : '';
        },
      },
      {
        field: 'actions',
        type: 'actions',
        minWidth: 200,
        flex: 0.5,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<Delete />}
            onClick={() => {
              // check if the type if custody and envoke groupCustodyDeleted function,

              if (params.row.type === 'Custody') {
                dispatch(
                  currencyGroupCustodyDeleted({
                    id: params.row.groupId,
                    operation: params.id as string,
                    amount: params.row.amount,
                  })
                );
              } else {
                dispatch(
                  currencyGroupOperationDeleted({
                    id: params.row.groupId,
                    operation: params.id as string,
                    amount: params.row.amount,
                  })
                );
              }

              if (params.row.type === 'Virtual') {
                dispatch(
                  currencyGroupCustodyTotalUpdated({
                    id: params.row.groupId as string,
                    amount: -params.row.amount,
                  })
                );
              }

              dispatch(operationDeleted(params.id));
            }}
            label="Edit"
          />,
        ],
      },
    ];
  };

  // TODO: get a be

  const columns = React.useMemo<
    (currency: string) => GridColumns<OperationAccounts>
  >(() => getColumns, [data]);

  const submitOperation = (
    data: Omit<OperationType, 'id'>,
    groupId: string
  ) => {
    try {
      const account = getAccount(accountOptions ?? [], data.account);

      const o = dispatch(operationAdded({ id: nanoid(), ...data }));
      const c = dispatch(
        currencyGroupOperationAdded({
          id: groupId,
          operation: o.payload.id,
          currency: account.currency,
          amount: o.payload.amount,
        })
      );

      if (account.type === 'Virtual') {
        dispatch(
          currencyGroupCustodyTotalUpdated({
            id: groupId,
            amount: o.payload.amount,
          })
        );
      }
      toast('new operation added', {
        hideProgressBar: true,
      });
    } catch (err) {
      toast('some error in creating operation');
    }
  };

  return (
    <React.Fragment>
      {Object.keys(data).map((currency) => {
        return (
          <Card key={currency} elevation={1}>
            <CardContent>
              <Typography variant="h2">{currency}</Typography>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 1, sm: 2, md: 1 }}
              >
                <Box
                  sx={{
                    height: 300,
                    width: '100%',
                    '& .operation--Custody': {
                      bgcolor: '#f2a900',
                      '&:hover': {
                        bgcolor: darken('#f2a900', 0.1),
                      },
                    },
                    '& .operation--error-header': {
                      backgroundColor: '#ff726f',
                    },
                    '& .operation--success-header': {
                      backgroundColor: '#008d90',
                      color: 'white',
                    },
                  }}
                >
                  <DataGrid
                    rows={data[currency]}
                    columns={columns(currency)}
                    getRowClassName={(params) =>
                      `operation--${params.row.type}`
                    }
                    components={{
                      Footer: () => null,
                    }}
                  />
                </Box>
                <Card sx={{ minWidth: 600 }} elevation={0}>
                  <CardContent>
                    <Operation
                      submitOperation={(v) => {
                        submitOperation(v, data[currency][0].groupId);
                      }}
                      accountOptions={getAccountOptions(
                        accountOptions ?? [],
                        currency,
                        data[currency].map((o) => o.account)
                      )}
                    />
                  </CardContent>
                </Card>
              </Stack>
            </CardContent>
          </Card>
        );
      })}
    </React.Fragment>
  );
};

export default GroupsAndOperations;
