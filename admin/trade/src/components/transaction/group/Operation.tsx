/** @format */
import { Button, TextField, Autocomplete, InputAdornment } from '@mui/material';
import * as React from 'react';
import { Add } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import {
  AccountOption,
  OperationFormSchema,
  Currency,
  CryptoCurrency,
} from '@/types';
import { getAccount } from '@/utils';

type OptionalOperationProps = {
  size: 'small' | 'medium';
  currency: Currency | CryptoCurrency | null;
};

type OperationProps = {
  accountOptions: Array<AccountOption>;
  submitOperation: (operation: OperationFormSchema) => void;
} & Partial<OptionalOperationProps>;

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

  const getAcc = (id: string): AccountOption => {
    try {
      const acc = getAccountObj(accountOptions, id);
      return acc;
    } catch (err) {
      return {
        balance: 0,
        currency: '',
        custodyAccountId: '',
        type: 'Fiat',
        id: '',
        label: '',
      };
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="account"
        control={control}
        rules={{ required: true }}
        render={({ field: { value, ...rest } }) => (
          <Autocomplete
            {...rest}
            value={accountOptions.find((a) => a.id === value) || null}
            groupBy={(option) => option.type}
            options={accountOptions.sort(
              (a, b) => -a.type.localeCompare(b.type)
            )}
            getOptionLabel={(item) => (item?.label ? item?.label : '')}
            sx={{ mb: 2 }}
            size={size}
            fullWidth
            renderInput={(params) => (
              <TextField
                {...params}
                required
                fullWidth
                variant="outlined"
                label="Accounts"
                helperText={`ID: ${value}`}
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
        fullWidth
        type="number"
        sx={{ mb: 2 }}
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
          validate: (v) => {
            const acc = getAcc(watch('account'));
            return validateBalance(
              v,
              acc.balance!,
              acc.type === 'Virtual',
              acc.allowNegative
            );
          },
        })}
        error={Boolean(errors.amount)}
        helperText={
          errors.amount?.message ||
          `Balance: ${getAcc(watch('account')).balance ?? ''}`
        }
      />

      <Button type="submit" fullWidth variant="contained">
        <Add sx={{ mr: 1 }} />
        Add
      </Button>
    </form>
  );
};

export default Operation;

const validateBalance = (
  value: number,
  balance: number,
  isVirtual = false,
  isNegative = true
) => {
  if (isVirtual && isNegative) {
    return true;
  }

  if (isVirtual && !isNegative) {
    return 0 + value > 0 || 'amount cannot be negative';
  }
  return balance + value > 0 || `insufficient balance`;
};
