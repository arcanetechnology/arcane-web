/** @format */
import {
  Card,
  Button,
  CardContent,
  CardActions,
  TextField,
  Autocomplete,
  Box,
  InputAdornment,
} from '@mui/material';
import * as React from 'react';
import { Add } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import {
  AccountOption,
  Operation as OperationType,
  Currency,
  CryptoCurrency,
} from '../../../types';
import { getAccount } from '../../../state';

type OptionalOperationProps = {
  size: 'small' | 'medium';
  currency: Currency | CryptoCurrency | null;
};

type OperationProps = {
  accountOptions: Array<AccountOption>;
  submitOperation: (operation: Omit<OperationType, 'id' | 'status'>) => void;
} & Partial<OptionalOperationProps>;

type OperationFormSchema = {
  account: string;
  amount: number;
};

const Operation: React.FC<OperationProps> = ({
  submitOperation,
  accountOptions,
  currency = null,
  size = 'medium',
}) => {
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

  const getAccountObj = React.useMemo(() => getAccount, [accountOptions]);

  const getAcc = (id: string) => {
    try {
      const acc = getAccountObj(accountOptions, id);
      return acc;
    } catch (err) {
      return {
        balance: 0,
        currency: '',
      };
    }
  };

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
                  size={size}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      variant="outlined"
                      label="Accounts"
                      helperText={value || `ID: ${watch('account')}`}
                    />
                  )}
                  onChange={(_event, data) => {
                    rest.onChange(data?.id ?? '');
                  }}
                />
              )}
            />
            <TextField
              required
              size={size}
              label="Amount"
              type="number"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {currency ? currency : getAcc(watch('account')).currency}
                  </InputAdornment>
                ),
              }}
              {...register('amount', {
                valueAsNumber: true,
                required: true,
                deps: ['account'],
                validate: (v) =>
                  validateBalance(v, getAcc(watch('account')).balance),
              })}
              error={Boolean(errors.amount)}
              helperText={
                errors.amount?.message ||
                `Balance: ${getAcc(watch('account')).balance}`
              }
            />
          </Box>
        </CardContent>
        <CardActions>
          <Button type="submit">
            <Add sx={{ mr: 1 }} />
            Add
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

export default Operation;

const validateBalance = (value: number, balance: number) => {
  return balance + value > 0 || `balance is in negative`;
};
