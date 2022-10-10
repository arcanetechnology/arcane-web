/** @format */

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CreateProfileForm, profileTypes } from '@/types';
import { useForm, Controller } from 'react-hook-form';
import { GAP } from '@/constants';
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Card,
  CardContent,
  Box,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

const schema = z.object({
  type: z.enum(profileTypes),
  alias: z.string().nonempty('please specify a label for your profile'),
});

type ProfileFormProps = {
  handleSubmit: (data: CreateProfileForm) => void;
  isLoading?: boolean;
};

const ProfileForm: React.FC<ProfileFormProps> = ({
  handleSubmit,
  isLoading = false,
}) => {
  const {
    register,
    handleSubmit: onSubmit,
    control,
  } = useForm<CreateProfileForm>({
    resolver: zodResolver(schema as any),
    defaultValues: {
      type: 'BUSINESS',
    },
  });
  return (
    <Card elevation={0}>
      <CardContent
        id="create-user-form"
        component="form"
        onSubmit={onSubmit(handleSubmit)}
        sx={{ display: 'flex', gap: GAP, alignItems: 'center' }}
      >
        <FormControl required component="fieldset">
          <Controller
            rules={{ required: true }}
            control={control}
            aria-labelledby="profile-type-radio-button-group"
            name="type"
            render={({ field }) => (
              <RadioGroup row {...field} sx={{ minWidth: 300 }}>
                <FormControlLabel
                  value="BUSINESS"
                  control={<Radio />}
                  label="Business"
                />
                <FormControlLabel
                  value="PERSONAL"
                  control={<Radio />}
                  label="Personal"
                />
              </RadioGroup>
            )}
          />
        </FormControl>
        <TextField
          size="medium"
          label="Alias"
          required
          {...register('alias')}
          fullWidth
          InputLabelProps={{}}
          InputProps={{
            sx: {
              borderRadius: 3,
            },
          }}
        />
        <Box>
          <LoadingButton
            size="medium"
            loading={isLoading}
            type="submit"
            variant="contained"
          >
            Submit
          </LoadingButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProfileForm;
