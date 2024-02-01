"use client";

import { Button } from "@/components/ui/button";
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
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import { addBox, addCustomer } from "@/actions/action";
import { newCustomerSchema } from "@/lib/validation";
import { useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Customer() {
  const user = useUser();

  const router = useRouter();

  const form = useForm<z.infer<typeof newCustomerSchema>>({
    resolver: zodResolver(newCustomerSchema),
    defaultValues: {
      id: uuidv4(),
      userId: "",
      customerName: "",
      customerNumber: "",
    },
  });

  async function onSubmit(values: z.infer<typeof newCustomerSchema>) {
    console.log(values);
    try {
      const result = await addCustomer(values);
      if (result?.success) {
        toast.success("Customer added successfully");
        form.reset();
        router.push("/");
      }

      if (result?.error) {
        toast.error(result.error);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    if (user.user) {
      form.setValue("userId", user.user?.id || "");
    }
  }, [user]);

  return (
    <div className="flex h-full flex-col items-center justify-between">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="customerName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Customer name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="customerNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Customer number</FormLabel>
                <FormControl>
                  <Input placeholder="Mobile" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
