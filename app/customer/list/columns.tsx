"use client";

import { Button } from "@/components/ui/button";
import { CustomerType } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";

export const Columns: ColumnDef<CustomerType>[] = [
  {
    accessorKey: "customerName",
    header: "Customer Name",
  },
  {
    accessorKey: "customerNumber",
    header: "Customer Number",
  },
  {
    accessorKey: "createdAt",
    header: "Created",
  },
  {
    accessorKey: "id",
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
