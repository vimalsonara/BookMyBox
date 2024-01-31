"use client";

import { addBooking, fetchBox } from "@/actions/action";
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
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { newBoxFormSchema, newBookingFormSchema } from "@/lib/validation";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectContent } from "@radix-ui/react-select";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

type BoxType = z.infer<typeof newBoxFormSchema>;

export default function Booking() {
  const user = useUser();
  const [boxList, setBoxList] = useState<BoxType[]>([]);

  const router = useRouter();

  useEffect(() => {
    const fetchBoxList = async () => {
      const box = await fetchBox();
      if (box.success) {
        setBoxList(box.success);
      }
    };
    fetchBoxList();
  }, []);

  const form = useForm<z.infer<typeof newBookingFormSchema>>({
    resolver: zodResolver(newBookingFormSchema),
    defaultValues: {
      boxId: "",
      customerName: "",
      userId: "",
    },
  });

  async function onSubmit(values: z.infer<typeof newBookingFormSchema>) {
    try {
      const result = await addBooking(values);

      form.reset();

      if (result?.success) {
        toast.success("Booking added successfully");
        router.push("/");
      }

      if (result?.error) {
        toast(result.error);
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
            name="boxId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Box</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Box" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-blue-500">
                    {boxList.map((box) => (
                      <SelectItem key={box.id} value={box.id}>
                        {box.boxName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="customerName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Customer Name</FormLabel>
                <Input type="text" placeholder="Customer Name" {...field} />
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
