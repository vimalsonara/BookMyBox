"use client";

import { addBox } from "@/actions/action";
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
import { newBoxFormSchema } from "@/lib/validation";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

export default function BoxForm() {
  const user = useUser();

  const router = useRouter();

  const form = useForm<z.infer<typeof newBoxFormSchema>>({
    resolver: zodResolver(newBoxFormSchema),
    defaultValues: {
      id: "",
      boxName: "",
      userId: "",
    },
  });

  async function onSubmit(values: z.infer<typeof newBoxFormSchema>) {
    try {
      const result = await addBox(values);
      form.reset();
      if (result?.success) {
        toast.success("Box added successfully");
        window.location.reload();
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    if (user.user) {
      form.setValue("userId", user.user?.id || "");
      form.setValue("id", uuidv4());
    }
  }, [user]);

  return (
    <div className="flex h-full flex-col items-center justify-between">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="boxName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Box Name</FormLabel>
                <FormControl>
                  <Input placeholder="Box 1" {...field} />
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
