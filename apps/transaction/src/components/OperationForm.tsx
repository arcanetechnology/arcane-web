/** @format */

import { TextField, Autocomplete, Box } from '@mui/material';
import type { FC } from 'react';
import { getAccounts } from '../state';
import { useForm, Controller } from 'react-hook-form';

type OperationFormProps = {
  accounts: string[];
};

const OperationForm: FC<OperationFormProps> = ({ accounts }) => {
  const accountDatas = getAccounts(accounts);
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: { account: '', amount: 0 },
  });

  const onSubmit = (data) => console.log(data);

  console.log(watch('account'));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box display={'flex'} flexDirection={'row'} gap={2} alignItems="center">
        <Controller
          name="account"
          control={control}
          rules={{ required: true }}
          render={({ field: { value, ...rest } }) => (
            <Autocomplete
              disablePortal
              options={accountDatas}
              {...rest}
              value={accountDatas.find((a) => a.id === value) || null}
              groupBy={(option) => option?.type ?? ''}
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
        <input type="submit" />
      </Box>
    </form>
  );
};

export default OperationForm;
