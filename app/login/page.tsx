"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginWithCredentials } from "../actions/authActions";
import GithubSignIn from "@/components/GithubsignIn";

const formSchema = z.object({
  email: z.string().email(),
  psswrd: z.string().min(5, "psswrd must contain at least 5 characters"),
});

function LoginPage() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      psswrd: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    const { email, psswrd } = data;
    const response = await loginWithCredentials({
      email,
      psswrd,
    });
    console.log("🚀 ~ handleSubmit ~ response:", response);

    if (response?.error) {
      form.setError("root", {
        message: response.message,
      });
    } else {
      router.push("/login");
    }
  };

  const email = form.getValues("email");

  return (
    <main className="flex min-h-screen items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Login to your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <fieldset
                className="flex flex-col gap-2"
                disabled={form.formState.isSubmitting}
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="psswrd"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>psswrd</FormLabel>
                      <FormControl>
                        <Input {...field} type="psswrd" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {!!form.formState.errors.root?.message && (
                  <FormMessage>
                    {form.formState.errors.root?.message}
                  </FormMessage>
                )}
                <Button type="submit">Login</Button>
              </fieldset>
            </form>
          </Form>
        </CardContent>
        <GithubSignIn />
        <CardFooter className="flex-col gap-2">
          <div className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="underline">
              Register
            </Link>
          </div>
          <div className="text-sm text-muted-foreground">
            Forgot psswrd?{" "}
            <Link
              href={`/psswrd-reset${
                email ? `?email=${encodeURIComponent(email)}` : ""
              }`}
              className="underline"
            >
              Reset my psswrd
            </Link>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
}

export default LoginPage;
