"use client";

import { currentWeekTotalCollection } from "@/actions/action";
import DashboardCard from "@/components/DashboardCard";
import { IndianRupee } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function CurrentWeekCollection() {
  const [weekTotalCollection, setWeekTotalCollection] = useState<string>("0");

  useEffect(() => {
    const fetchCurrentWeekCollection = async () => {
      const data = await currentWeekTotalCollection();

      if (data.success) {
        const total = data.success.reduce((prev, curr) => prev + curr.total, 0);
        setWeekTotalCollection(total.toString());
      }

      if (data.error) {
        toast.error(data.error);
      }
    };
    fetchCurrentWeekCollection();
  }, []);

  return (
    <DashboardCard
      cardTitle="This Week"
      total={weekTotalCollection}
      icon={<IndianRupee />}
    />
  );
}
