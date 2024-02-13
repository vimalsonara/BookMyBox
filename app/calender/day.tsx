"use client";

import { listBookingByDate } from "@/actions/action";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BookingType } from "@/lib/types";
import Link from "next/link";
import { useEffect, useState } from "react";

interface DayProps {
  date: string;
}

export default function Day({ date }: DayProps) {
  const [bookings, setBookings] = useState<BookingType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const bookings = await listBookingByDate(date);
      console.log("bookings", bookings);
      if (bookings.success) {
        setBookings(bookings.success);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {bookings.map((booking) => (
        <div key={booking.bookingId} className="p-2">
          <div>{booking.customerName}</div>
          <div>
            {booking.box} - {booking.bookingStartTime} -{" "}
            {booking.bookingEndTime}
          </div>
          <Separator />
        </div>
      ))}
      <div className="flex justify-center">
        <Link href="/booking">
          <Button size={"sm"}>Add Booking</Button>
        </Link>
      </div>
    </div>
  );
}
