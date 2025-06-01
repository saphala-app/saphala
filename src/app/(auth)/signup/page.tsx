'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FcGoogle } from 'react-icons/fc';
import { signIn } from 'next-auth/react';
import { toast } from 'react-toastify';

import { Form } from '@/components/ui/form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { BACKEND_API } from '@/lib/api';
import { SignupInputs, signupSchema } from '@/lib/validation';
import FormInput from '@/components/common/form-input';
import { PasswordField } from '@/components/common/password-input';

export default function Register({ className }: React.ComponentProps<'div'>) {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<SignupInputs>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      full_name: '',
      user_name: '',
    },
  });

  const handleSignup: SubmitHandler<SignupInputs> = async data => {
    try {
      const { data: response } = await BACKEND_API.post('/signup', data);
      console.log(response);

      toast.success('Your account has created successfully!');

      router.push('/');
    } catch (error: unknown) {
      if (typeof error === 'object') {
        const err = error as Error;

        toast.error(err.message || 'Sign-in failed. Please try again.');
        setErrorMessage(err.message || 'Sign-in failed. Please try again.');
      }

      if (error instanceof Error) {
        toast.error(error.message || 'Sign-in failed. Please try again.');
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signIn('google', {
        redirectTo: '/',
      });
    } catch (error: unknown) {
      console.error('Google signin error:', error);
      toast.error('An error occurred during Google sign-in');
    }
  };

  return (
    <div className={cn('flex w-full max-w-lg flex-col gap-6', className)}>
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-2xl">Create an account</CardTitle>
          <CardDescription className="text-center">
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSignup)} className="space-y-4">
              <div className="flex flex-col gap-4 md:flex-row">
                <FormInput name="full_name" label="Full Name" placeholder="John Doe" isAsterisk />

                <FormInput name="user_name" label="User Name" placeholder="john" isAsterisk />
              </div>
              <FormInput name="email" label="Email" placeholder="john@doe.com" isAsterisk />
              <PasswordField name="password" label="Password" placeholder="Password" isAsterisk />

              {errorMessage && (
                <div className="my-4 rounded-lg border border-red-200 bg-gradient-to-r from-red-50 to-red-100 px-4 py-4 text-sm text-red-700 shadow-sm">
                  {errorMessage}
                </div>
              )}

              <Button type="submit" className="w-full">
                Register
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background text-muted-foreground px-2">Or continue with</span>
                </div>
              </div>

              <Button
                onClick={handleGoogleSignIn}
                variant="outline"
                className="flex w-full items-center gap-4 py-5"
              >
                <FcGoogle />
                Login with Google
              </Button>
              <div className="mt-4 text-center text-sm text-neutral-600">
                Already have an account?{' '}
                <Link
                  href="/signin"
                  className="underline decoration-dashed underline-offset-4 transition-colors hover:text-blue-600"
                >
                  Sign in
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
