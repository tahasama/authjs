"use client";

import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const matchPsswrdSchema = z
  .object({
    psswrd: z.string().min(5, "your password must be at least 6 caratcters"),
    confirmPsswrd: z.string(),
  })
  .superRefine((val, ctx) => {
    if (val.psswrd !== val.confirmPsswrd) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["confirmPsswrd"],
        message: "your passwords do not match, please try again",
      });
    }
  });

const formSchema = z
  .object({
    email: z.string().email("please add a valid email"),
  })
  .and(matchPsswrdSchema);

const Register = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      psswrd: "",
      confirmPsswrd: "",
    },
  });

  const hansleSubmit = async (data: z.infer<typeof formSchema>) => {};

  return (
    <main className="grid place-content-center min-h-screen">
      <Card className="min-w-80">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>create your new account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(hansleSubmit)}
              className="flex flex-col gap-3"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={form.control}
                name="psswrd"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={form.control}
                name="confirmPsswrd"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <Button type="submit" className="mt-2">
                Register
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
};

export default Register;
