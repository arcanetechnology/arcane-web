/** @format */
import {
  Card,
  IconButton,
  CardContent,
  CardActions,
  TextField,
  Autocomplete,
  Box,
  InputAdornment,
} from '@mui/material';
import * as React from 'react';
import { Add, Delete } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import {
  TransactionAccount,
  Operation as OperationType,
  CurrencyTypes,
  CryptoCurrencyTypes,
} from '../../types';

type OperationProps = {
  accountOptions: Array<TransactionAccount>;
  submitOperation: (operation: Omit<OperationType, 'id' | 'status'>) => void;
  currency: CurrencyTypes | CryptoCurrencyTypes | null;
};

type OperationFormSchema = {
  account: string;
  amount: number;
};

const Operation: React.FC<OperationProps> = ({
  submitOperation,
  accountOptions,
  currency,
}) => {
  const [ccy, setCcy] = React.useState(currency);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<OperationFormSchema>({
    defaultValues: { account: '', amount: 0 },
  });

  const onSubmit = (data: OperationFormSchema) => submitOperation(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        elevation={0}
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
                    (a, b) => -a.type.localeCompare(b.type)
                  )}
                  getOptionLabel={(item) => (item?.label ? item?.label : '')}
                  sx={{ width: 300 }}
                  size="medium"
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      variant="outlined"
                      label="Accounts"
                      helperText={value}
                    />
                  )}
                  onChange={(_event, data) => {
                    rest.onChange(data?.id ?? '');
                    if (!currency) {
                      setCcy(data?.currency ?? '');
                    }
                  }}
                />
              )}
            />
            <TextField
              required
              size="medium"
              label="Amount"
              type="number"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">{ccy}</InputAdornment>
                ),
              }}
              {...register('amount', { required: true })}
            />
          </Box>
        </CardContent>
        <CardActions>
          <IconButton type="submit">
            <Add />
          </IconButton>
        </CardActions>
      </Card>
    </form>
  );
};

export default Operation;
