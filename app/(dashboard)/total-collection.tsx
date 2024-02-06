"use client";

import { totalCollection } from "@/actions/action";
import DashboardCard from "@/components/DashboardCard";
import { IndianRupee } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function TotalCollection() {
  const [totalCollectionAmount, setTotalCollectionAmount] =
    useState<string>("0");

  useEffect(() => {
    const fetchTodayCollection = async () => {
      const today = await totalCollection();

      if (today.success) {
        setTotalCollectionAmount(today.success);
      }

      if (today.error) {
        toast.error(today.error);
      }
    };
    fetchTodayCollection();
  }, []);

  return (
    <DashboardCard
      cardTitle="Total Collection"
      total={totalCollectionAmount}
      icon={<IndianRupee />}
    />
  );
}
