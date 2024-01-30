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
import { bookingFormSchema, extendedBoxFormSchema } from "@/lib/validation";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectContent } from "@radix-ui/react-select";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

type BoxType = z.infer<typeof extendedBoxFormSchema>;

export default function Booking() {
  const user = useUser();
  const [boxList, setBoxList] = useState<BoxType[]>([]);

  useEffect(() => {
    const fetchBoxList = async () => {
      const box = await fetchBox();
      if (box.success) {
        setBoxList(box.success);
      }
    };
    fetchBoxList();
  }, []);

  const form = useForm<z.infer<typeof bookingFormSchema>>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      id: uuidv4(),
      boxId: "",
      customerName: "",
    },
  });

  function onSubmit(values: z.infer<typeof bookingFormSchema>) {
    console.log("values", values);
    console.log("submit");
    console.log("user", user);
    const formData = {
      id: values.id,
      boxId: values.boxId,
      customerName: values.customerName,
      userId: user.user?.id || "",
    };

    addBooking(formData).then((res) => {
      console.log(res);
    });
  }

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
