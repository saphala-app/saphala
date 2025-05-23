import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { FcGoogle } from 'react-icons/fc';
import { signIn } from 'next-auth/react';
import { toast } from 'react-toastify';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { BACKEND_API } from '@/lib/api';

const formSchema = z.object({
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

type FormInputs = z.infer<typeof formSchema>;

const RegisterPage = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      full_name: '',
      user_name: '',
    },
  });

  const doSignup: SubmitHandler<FormInputs> = async data => {
    try {
      await BACKEND_API.post('/signup', data);
      toast.success('Your account has created successfully!');
      router.push('/signin');
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || 'Sign-in failed. Please try again.');
        setErrorMessage(error.message || 'Sign-in failed. Please try again.');
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signIn('google', { redirectTo: '/' });
    } catch (error: unknown) {
      toast.error(
        'An error occurred during Google sign-in' +
          (error instanceof Error && error.message ? `: ${error.message}` : '')
      );
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col lg:flex-row">
      {/* Left Section */}
      <div className="relative m-auto flex flex-1 items-center justify-center">
        <div className="left-section-content relative z-20 flex flex-col items-center p-15 pt-12 text-center lg:block lg:pt-0 lg:text-left">
          <div className="flex items-center justify-center lg:mb-2 lg:justify-start">
            <Image
              src="/logo.png"
              alt="SOPHALA Logo"
              width={100}
              height={100}
              className="object-contain sm:h-20 lg:h-24"
            />
          </div>
          <h1 className="w-3xl from-gray-400/90 from-10% to-gray-50 to-75% leading-tight font-[900] tracking-wide md:text-4xl lg:text-6xl dark:bg-gradient-to-b dark:bg-clip-text dark:text-transparent">
            Your Media Universe. <span className="text-red-400">Tracked</span>,{' '}
            <span className="text-red-600">Rated</span>, and{' '}
            <span className="text-red-800">Shared</span>.
          </h1>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-1 items-center justify-center">
        <div className="form-container w-full max-w-md rounded-lg shadow-xl">
          <h2 className="mb-6 text-center text-3xl font-bold text-red-500 sm:mb-8 sm:text-4xl">
            Register
          </h2>

          {errorMessage && (
            <div className="my-4 rounded bg-red-600 px-4 py-2 text-white">{errorMessage}</div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(doSignup)} className="space-y-4">
              <div className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="full_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Full Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="user_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>User name</FormLabel>
                      <FormControl>
                        <Input placeholder="User name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full bg-red-500 hover:bg-red-600">
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
                className="flex w-full items-center gap-4"
              >
                <FcGoogle />
                Login with Google
              </Button>

              <div className="mt-6 text-center sm:mt-8">
                <Link
                  href="/signin"
                  className="text-base text-red-500 transition duration-300 hover:underline sm:text-lg"
                >
                  Already Have An Account? Login
                </Link>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
