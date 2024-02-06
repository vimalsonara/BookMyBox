"use client";

import { useEffect, useState } from "react";
import { Columns } from "./columns";
import { DataTable } from "@/components/DataTable";
import { listAllCustomer } from "@/actions/action";
import { CustomerType } from "@/lib/types";

export default function CustomerList() {
  const [data, setData] = useState<CustomerType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const customer = await listAllCustomer();
      if (customer.success) {
        setData(customer.success);
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
