"use client";

import { todayTotalCollection } from "@/actions/action";
import DashboardCard from "@/components/DashboardCard";
import { IndianRupee } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function TodayCollection() {
  const [todayCollection, setTodayCollection] = useState<string>("0");

  useEffect(() => {
    const fetchTodayCollection = async () => {
      const today = await todayTotalCollection();

      if (today.success) {
        setTodayCollection(today.success);
      }

      if (today.error) {
        toast.error(today.error);
      }
    };
    fetchTodayCollection();
  }, []);

  return (
    <DashboardCard
      cardTitle="Today Collection"
      total={todayCollection}
      icon={<IndianRupee />}
    />
  );
}
