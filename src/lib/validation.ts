import z from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(2, {
      message: 'Email must be at least 2 characters.',
    })
    .email(),
  password: z.string().min(2, {
    message: 'Password must be at least 2 characters.',
  }),
});

export type LoginInputs = z.infer<typeof loginSchema>;

export const signupSchema = z.object({
  email: z
    .string()
    .min(2, {
      message: 'Email must be at least 2 characters.',
    })
    .email(),
  password: z.string().min(2, {
    message: 'Password must be at least 2 characters.',
  }),
  full_name: z.string().min(2, {
    message: 'Full Name must be at least 2 characters.',
  }),
  user_name: z.string().min(2, {
    message: 'User Name must be at least 2 characters.',
  }),
});

export type SignupInputs = z.infer<typeof signupSchema>;
