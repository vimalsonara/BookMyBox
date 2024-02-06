"use client";

import { todayTotalBooking } from "@/actions/action";
import DashboardCard from "@/components/DashboardCard";
import { Calculator } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function TodayBooking() {
  const [todayBookingTotal, setTodayBookingTotal] = useState<string>("0");

  useEffect(() => {
    const fetchTodayBookingTotal = async () => {
      const today = await todayTotalBooking();

      if (today.success) {
        setTodayBookingTotal(today.success.toString());
      }

      if (today.error) {
        toast.error(today.error);
      }
    };
    fetchTodayBookingTotal();
  }, []);

  return (
    <DashboardCard
      cardTitle="Today Booking"
      total={todayBookingTotal}
      icon={<Calculator />}
    />
  );
}
