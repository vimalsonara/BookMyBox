"use client";

import { currentWeekTotalCollection } from "@/actions/action";
import ChartCard from "@/components/ChartCard";
import { WeekCollection } from "@/lib/types";
import { useEffect, useState } from "react";
import BarChart from "./bar-chart";

export default function WeekCollectionChart() {
  const [weekCollection, setWeekCollection] = useState<WeekCollection[]>([]);
  useEffect(() => {
    const fetchWeekCollection = async () => {
      const data = await currentWeekTotalCollection();
      if (data.success) {
        setWeekCollection(data.success);
      }
    };
    fetchWeekCollection();
  }, []);

  return (
    <ChartCard heading="Last 7 days">
      <BarChart bookingData={weekCollection} />
    </ChartCard>
  );
}
