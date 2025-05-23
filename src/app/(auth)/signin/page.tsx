"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react"
import { toast } from "react-toastify"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import Link from "next/link"

const formSchema = z.object({
  email: z.string().min(2, {
    message: "Email must be at least 2 characters.",
  }).email(),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
})

type FormInputs = z.infer<typeof formSchema>

export default function LoginForm({ className }: React.ComponentProps<"div">) {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })


  const doLogin: SubmitHandler<FormInputs> = async (data) => {

    try {
      const response = await signIn("credentials", {
        ...data,
        redirect: false,
        redirectTo: "/",
      });

      if (response.error === "CredentialsSignin") {
        toast.error("Unable to logged in. Please check details.")

        return false;
      }
      
    } catch (error: unknown) {
      console.error("Signin error:", error);

      if (error instanceof Error) {
        toast.error(error.message || "Sign-in failed. Please try again.");
      }

    }
  }


  const handleGoogleSignIn = async () => {
    try {
      await signIn("google", {
        redirectTo: "/",
      });
    } catch (error: unknown) {

      toast.error("An error occurred during Google sign-in");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6 w-full max-w-lg", className)}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login</CardTitle>
          <CardDescription className="text-center">
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(doLogin)}
                className="flex flex-col gap-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </form>
            </Form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <Button onClick={handleGoogleSignIn} variant="outline" className="w-full flex items-center gap-4">
              <FcGoogle />
              Login with Google
            </Button>

            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div >
  )
}
