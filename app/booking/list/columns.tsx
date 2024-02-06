"use client";

import { Button } from "@/components/ui/button";
import { BookingType } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";

export const Columns: ColumnDef<BookingType>[] = [
  {
    accessorKey: "box",
    header: "Box",
  },
  {
    accessorKey: "bookingDate",
    header: "Booking Date",
  },
  {
    accessorKey: "customerName",
    header: "Customer Name",
  },
  {
    accessorKey: "customerNumber",
    header: "Customer Number",
  },
  {
    accessorKey: "bookingStartTime",
    header: "Booking Time",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "bookingId",
    header: () => <div className="text-center">Action</div>,
    cell: ({}) => {
      return (
        <div className="flex justify-center space-x-2">
          <Button>Edit</Button>
          <Button variant="destructive">Delete</Button>
        </div>
      );
    },
  },
];
