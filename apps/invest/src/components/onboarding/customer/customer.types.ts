/** @format */
import { z } from 'zod';

export const schema = z.object({
  companyBehalf: z.string().nonempty(),
  name: z.string().nonempty(),
  company: z.string().nonempty(),
  residence: z.string().nonempty(),
  number: z.number().nonnegative(),
});

export type Customer = z.infer<typeof schema>;

export type CustomerError = z.inferFlattenedErrors<typeof schema>;

export const initialValue: Customer = {
  companyBehalf: '',
  name: '',
  company: '',
  residence: '',
  number: 0,
};
