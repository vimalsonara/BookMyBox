"use client";

import CurrentWeekCollection from "./current-week-collection";
import LastTenBookings from "./last-ten-bookings";
import TodayBooking from "./today-booking";
import TodayCollection from "./today-collection";
import TotalBooking from "./total-booking";
import TotalCollection from "./total-collection";
import WeekCollectionChart from "./week-collection";

export default async function Home() {
  return (
    <div className="flex flex-col gap-2 p-2">
      <div className="mt-3 grid gap-3 md:grid-cols-2 lg:grid-cols-5">
        <TodayCollection />
        <TodayBooking />
        <CurrentWeekCollection />
        <TotalCollection />
        <TotalBooking />
      </div>
      <div className="overflow-x-auto">
        <WeekCollectionChart />
      </div>
      <div className="overflow-x-auto">
        <LastTenBookings />
      </div>
    </div>
  );
}
