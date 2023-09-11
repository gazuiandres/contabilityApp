import { z } from 'zod';

export const CreateTransactionSchema = z.object({
  body: z.object({
    category: z.string().nonempty(),
    description: z.string().nonempty(),
    type: z.string().nonempty(),
    date: z.coerce.date(),
    amount: z.number().nonnegative(),
  }),
});

export const GetAllTransactionsSchema = z.object({
  query: z.object({
    startDay: z.coerce.date({
      required_error: 'Start date is required',
      invalid_type_error: 'Write a valid date',
    }),
    endDay: z.coerce.date({
      required_error: 'End date is required',
      invalid_type_error: 'Write a valid date',
    }),
  }),
});

export const GetTransactionSchema = z.object({
  params: z.object({
    id: z.string().nonempty(),
  }),
});

export const GetAnalyticsSchema = z.object({
  query: z.object({
    startDay: z.coerce.date({
      required_error: 'Start date is required',
      invalid_type_error: 'Write a valid date',
    }),
    endDay: z.coerce.date({
      required_error: 'End date is required',
      invalid_type_error: 'Write a valid date',
    }),
    type: z.string({
        required_error: 'Type is required'
    }).nonempty("Write a type"),
  }),
});

export const UpdateTransactionSchema = z.object({
  body: z.object({
    category: z.string().nonempty().optional(),
    description: z.string().nonempty().optional(),
    type: z.string().nonempty().optional(),
    date: z.coerce.date().optional(),
    amount: z.number().min(1).optional(),
  }),
  params: z.object({
    id: z.string().nonempty(),
  }),
});

export const DeleteTransactionSchema = z.object({
  params: z.object({
    id: z.string().nonempty(),
  }),
});
