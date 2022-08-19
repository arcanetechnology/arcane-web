/** @format */
import { z } from 'zod';

// READ THIS BEFORE EDITING
// IMPORTANT: company should always be after company behalf!!!
export const formConfig = [
  {
    name: 'name',
    label: 'What is your name?',
    initialValue: '',
    validation: z.object({
      name: z.string().nonempty('please write your name'),
    }),
  },
  {
    name: 'companyBehalf',
    label: "Are you making this request on your company's behalf?",
    initialValue: '',
    validation: z.object({
      companyBehalf: z.string().nonempty('please select one option'),
    }),
  },
  {
    name: 'company',
    label: "What is your company's name?",
    initialValue: '',
    validation: z.object({
      company: z.string().nonempty('please enter your company name'),
    }),
  },
  {
    name: 'countryCode',
    label: 'What is your country of residence?',
    initialValue: '',
    validation: z.object({
      countryCode: z
        .string()
        .nonempty('please specify your country of residence'),
    }),
  },
  {
    name: 'nationalNumber',
    label: 'What is your phone number?',
    validation: z.object({
      countryCode: z.string().nonempty('please select the country code'),
      nationalNumber: z
        .string()
        .min(4)
        .nonempty('please enter your phone number')
        .regex(/^\d+$/),
    }),
  },
];
