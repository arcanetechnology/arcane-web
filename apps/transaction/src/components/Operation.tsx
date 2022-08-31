/** @format */
import {
  Card,
  IconButton,
  CardContent,
  CardActions,
  TextField,
  Autocomplete,
  Box,
} from '@mui/material';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { operationsSelector, RootState, getAccounts } from '../state';
import { Add, Delete } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { TransactionAccount, Operation as OperationType } from '../types';

type OperationProps = {
  id: string;
  accountOptions: Array<TransactionAccount>;
  deleteOperation: (id: string) => void;
  submitOperation: (operation: OperationType) => void;
};

type OperationFormSchema = {
  account: string;
  amount: number;
};

const Operation: React.FC<OperationProps> = ({
  id,
  deleteOperation,
  submitOperation,
  accountOptions,
}) => {
  const operation = useSelector((s: RootState) =>
    operationsSelector.selectById(s, id)
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<OperationFormSchema>({
    defaultValues: { account: '', amount: 0 },
  });

  if (!operation) {
    return null;
  }

  const onSubmit = (data: OperationFormSchema) =>
    submitOperation({ id: operation.id, ...data, status: 'added' });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card
        sx={{ display: 'flex', mb: 2, mt: 2, justifyContent: 'space-between' }}
      >
        <CardContent>
          <Box
            display={'flex'}
            flexDirection={'row'}
            gap={2}
            alignItems="center"
          >
            <Controller
              name="account"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, ...rest } }) => (
                <Autocomplete
                  disablePortal
                  {...rest}
                  value={accountOptions.find((a) => a.id === value) || null}
                  groupBy={(option) => option.type}
                  options={accountOptions.sort(
                    (a, b) => -b.type.localeCompare(a.type)
                  )}
                  getOptionLabel={(item) => (item?.label ? item?.label : '')}
                  sx={{ width: 300 }}
                  size="small"
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      variant="outlined"
                      label="Accounts"
                      error={!!errors['account']}
                      helperText={errors['account'] && 'item required'}
                    />
                  )}
                  onChange={(_event, data) => rest.onChange(data?.id ?? '')}
                />
              )}
            />
            <TextField
              required
              size="small"
              label="Amount"
              type="number"
              {...register('amount', { required: true })}
            />
          </Box>
        </CardContent>
        <CardActions>
          <IconButton type="submit">
            <Add />
          </IconButton>
          <IconButton onClick={() => deleteOperation(id)}>
            <Delete />
          </IconButton>
        </CardActions>
      </Card>
    </form>
  );
};

export default Operation;
