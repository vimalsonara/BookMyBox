"use client";

import { totalBooking } from "@/actions/action";
import DashboardCard from "@/components/DashboardCard";
import { Calculator } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function TotalBooking() {
  const [totalBookingCount, setTotalBookingCount] = useState<string>("0");

  useEffect(() => {
    const fetchTodayBookingTotal = async () => {
      const today = await totalBooking();

      if (today.success) {
        setTotalBookingCount(today.success.toString());
      }

      if (today.error) {
        toast.error(today.error);
      }
    };
    fetchTodayBookingTotal();
  }, []);

  return (
    <DashboardCard
      cardTitle="Total Booking"
      total={totalBookingCount}
      icon={<Calculator />}
    />
  );
}
