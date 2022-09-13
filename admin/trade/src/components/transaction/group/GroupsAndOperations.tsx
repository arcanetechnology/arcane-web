/** @format */

import {
  currencyGroupOperationAdded,
  currencyGroupOperationDeleted,
  currencyGroupsSelector,
  operationAdded,
  operationDeleted,
  operationsSelector,
  useTradeDispatch,
  useTradeSelector,
} from '@/state';
import { AccountOption, Operation as OperationType } from '@/types';
import { getAccount, getAccountOptions } from '@/utils';
import { Delete, ExpandMore, Rowing } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from '@mui/material';
import { Stack } from '@mui/system';
import { DataGrid, GridColumns, GridActionsCellItem } from '@mui/x-data-grid';
import { nanoid } from '@reduxjs/toolkit';
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

  const dispatch = useTradeDispatch();

  const columns = React.useMemo<GridColumns<OperationAccounts>>(
    () => [
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
        field: 'amount',
        headerName: 'Amount',
        flex: 1,
        minWidth: 300,
      },
      {
        field: 'actions',
        type: 'actions',
        minWidth: 350,
        flex: 0.5,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<Delete />}
            onClick={() => {
              dispatch(
                currencyGroupOperationDeleted({
                  id: params.row.groupId,
                  operation: params.id as string,
                })
              );

              dispatch(operationDeleted(params.id));
            }}
            label="Edit"
          />,
        ],
      },
    ],
    [data]
  );

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
        })
      );
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
          <Card key={currency} elevation={0}>
            <CardContent>
              <Stack gap={2}>
                <Accordion elevation={0}>
                  <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls={currency + 'operation-form'}
                    id={currency + 'operation-form'}
                  >
                    <Typography variant="h2">{currency}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
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
                  </AccordionDetails>
                </Accordion>
                <div style={{ height: 300, width: '100%' }}>
                  <DataGrid rows={data[currency]} columns={columns} />
                </div>
              </Stack>
            </CardContent>
          </Card>
        );
      })}
    </React.Fragment>
  );
};

export default GroupsAndOperations;
