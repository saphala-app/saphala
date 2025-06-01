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
import { LoginInputs, loginSchema } from '@/lib/validation';
import FormInput from '@/components/common/form-input';
import { PasswordField } from '@/components/common/password-input';
import { Spinner } from '@/components/common/spinner';

export default function LoginForm({ className }: React.ComponentProps<'div'>) {
  const form = useForm<LoginInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const doLogin: SubmitHandler<LoginInputs> = async data => {
    try {
      const response = await signIn('credentials', {
        ...data,
        redirect: false,
        redirectTo: '/',
      });

      if (response.error === 'CredentialsSignin') {
        toast.error('Unable to log in. Please check details.');

        return false;
      }
    } catch (error: unknown) {
      console.error('Signin error:', error);

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
          <CardTitle className="text-center text-2xl">Login</CardTitle>
          <CardDescription className="text-center">
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-8">
          <div className="flex flex-col gap-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(doLogin)} className="flex flex-col gap-6">
                <FormInput
                  name="email"
                  label="Email"
                  type="text"
                  placeholder="john@doe.com"
                  isAsterisk
                />
                <div>
                  <PasswordField
                    name="password"
                    label="Password"
                    placeholder="********"
                    isAsterisk
                  />
                  <Link
                    href="/forgot-password"
                    className="mt-1 flex justify-end text-xs font-medium underline decoration-dashed underline-offset-4"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? (
                    <Spinner className="size-4 text-white" />
                  ) : (
                    'Login'
                  )}
                </Button>
              </form>
            </Form>

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
              className="flex w-full items-center gap-4"
            >
              <FcGoogle />
              Login with Google
            </Button>

            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{' '}
              <Link
                href="/signup"
                className="underline decoration-dashed underline-offset-4 transition-colors hover:text-blue-600"
              >
                Sign up
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
