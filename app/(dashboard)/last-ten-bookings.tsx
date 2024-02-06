"use client";

import { listBooking } from "@/actions/action";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BookingType } from "@/lib/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default async function LastTenBookings() {
  const [bookingList, setBookingList] = useState<BookingType[]>([]);

  useEffect(() => {
    const fetchBooking = async () => {
      const booking = await listBooking();
      console.log("booking", booking);
      if (booking.success) {
        setBookingList(booking.success);
      }
      if (booking.error) {
        toast.error(booking.error);
      }
    };
    fetchBooking();
  }, []);

  return (
    <div>
      {bookingList.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Box</TableHead>
                  <TableHead>Customer Name</TableHead>
                  <TableHead>Customer Number</TableHead>
                  <TableHead>Booking Date</TableHead>
                  <TableHead>Booking Time</TableHead>
                  <TableHead>Booking Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookingList.map((booking) => (
                  <TableRow key={booking.bookingId}>
                    <TableCell>{booking.box}</TableCell>
                    <TableCell>{booking.customerName}</TableCell>
                    <TableCell>{booking.customerNumber}</TableCell>
                    <TableCell>{booking.bookingDate}</TableCell>
                    <TableCell>{booking.bookingStartTime}</TableCell>
                    <TableCell>{booking.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <div className="text-center">No booking found</div>
      )}
    </div>
  );
}
