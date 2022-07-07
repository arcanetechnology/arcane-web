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
    name: 'residence',
    label: 'What is your country of residence?',
    initialValue: '',
    validation: z.object({
      residence: z
        .string()
        .nonempty('please specify your country of residence'),
    }),
  },
  {
    name: 'phoneNumber',
    label: 'Could your inform a number for future contact?',
    validation: z.object({
      phoneNumber: z
        .string()
        .trim()
        .regex(
          /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
          'please enter a phone number'
        ),
    }),
  },
];
