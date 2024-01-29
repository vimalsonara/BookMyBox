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
import { addBox } from "@/actions/action";

const boxFormSchema = z.object({
  id: z.string().uuid(),
  boxName: z.string().min(1).max(20).toLowerCase(),
});

export const extendedBoxFormSchema = boxFormSchema.extend({
  userId: z.string().uuid(),
});

export default function Box() {
  const user = useUser();
  const form = useForm<z.infer<typeof boxFormSchema>>({
    resolver: zodResolver(boxFormSchema),
    defaultValues: {
      id: uuidv4(),
      boxName: "",
    },
  });

  function onSubmit(values: z.infer<typeof boxFormSchema>) {
    const formData = {
      id: values.id,
      boxName: values.boxName,
      userId: user.user?.id || "",
    };
    console.log(formData);
    addBox(formData);
  }

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
