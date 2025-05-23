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
import { useRouter } from "next/navigation"
import { useState } from "react"
import { BACKEND_API } from "@/lib/api"
import { ApiError } from "@/lib/ApiError"

const formSchema = z.object({
  email: z.string().min(2, {
    message: "Email must be at least 2 characters.",
  }).email(),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
  full_name: z.string().min(2, {
    message: "Full Name must be at least 2 characters.",
  }),
  user_name: z.string().min(2, {
    message: "User Name must be at least 2 characters.",
  }),
})

type FormInputs = z.infer<typeof formSchema>

export default function Register({ className }: React.ComponentProps<"div">) {

  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      full_name: "",
      user_name: "",
    },
  })


  const doSignup: SubmitHandler<FormInputs> = async (data) => {

    try {
      const { data: response } = await BACKEND_API.post("/signup", data);

      toast.success("Your account has created successfully!");

      router.push("/signin");

    } catch (error: unknown) {

      if (typeof error === "object") {
        const err = error as Error;

        toast.error(err.message || "Sign-in failed. Please try again.");
        setErrorMessage(err.message || "Sign-in failed. Please try again.");

      }

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
          <CardTitle className="text-2xl text-center">Create an account</CardTitle>
          <CardDescription className="text-center">
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>

          {errorMessage && <div className="bg-red-600 text-white px-4 py-2 rounded my-4">
            {errorMessage}
          </div>}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(doSignup)} className="space-y-4">
              <div className="flex flex-col gap-4 md:flex-row">
                <FormField
                  control={form.control}
                  name="full_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Full Name"
                          {...field}
                        />
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
                        <Input
                          placeholder="User name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              </div>
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
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
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

              <Button type="submit" className="w-full">
                Register
              </Button>

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
                Already have an account?{" "}
                <Link href="/signin" className="underline underline-offset-4">
                  Sign in
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
