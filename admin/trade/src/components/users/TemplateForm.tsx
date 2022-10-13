/** @format */

import { TemplateInput } from '@/types';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z, ZodType } from 'zod';
import { GAP } from '@/constants';
import { Box } from '@mui/system';
import { TextField } from '@mui/material';

type TemplateFormProps = {
  name: string;
  data: Array<TemplateInput>;
};

const TemplateForm: React.FC<TemplateFormProps> = ({ data, name }) => {
  const formData = data.reduce((prev, curr) => {
    return {
      [curr.name]: curr.type === 'string' ? '' : 0,
      ...prev,
    };
  }, {});

  const {
    register,
    handleSubmit: onSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(
      z.object(
        data.reduce((prev, curr) => {
          return {
            [curr.name]:
              curr.type === 'string'
                ? z.string().nonempty(`${curr.name} is required`)
                : z.number(),
            ...prev,
          };
        }, {}),
      ),
    ),
  });

  const handleSubmit = (data: Record<string, string | number>) => {};

  return (
    <Box
      component="form"
      gap={GAP}
      display="flex"
      flexDirection="row"
      onSubmit={onSubmit(handleSubmit)}
      id="template-form"
    >
      {data.map((input) => (
        <TextField
          type={input.type}
          label={input.label}
          fullWidth
          {...register(input.name)}
          required
          error={Boolean(errors[input.name])}
        />
      ))}
    </Box>
  );
};

export default TemplateForm;
