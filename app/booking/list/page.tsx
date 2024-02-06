"use client";

import { useEffect, useState } from "react";
import { Columns } from "./columns";
import { DataTable } from "@/components/DataTable";
import { listAllBooking } from "@/actions/action";
import { BookingType } from "@/lib/types";

export default function BookingList() {
  const [data, setData] = useState<BookingType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const bookings = await listAllBooking();
      console.log("bookings", bookings);
      if (bookings.success) {
        setData(bookings.success);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={Columns} data={data} />
    </div>
  );
}
