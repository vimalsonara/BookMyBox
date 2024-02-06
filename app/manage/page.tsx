import { totalBooking, totalBox, totalCustomer } from "@/actions/action";
import BookingForm from "./booking-form";
import BoxForm from "./box-form";
import CustomerForm from "./customer-form";
import DialogWrapper from "./dialog-wrapper";
import ManageCard from "@/components/ManageCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Manage() {
  const box = await totalBox();
  const customer = await totalCustomer();
  const booking = await totalBooking();

  return (
    <div className="grid gap-3 p-2 md:grid-cols-2 lg:grid-cols-3">
      <div>
        <ManageCard cardTitle="Total Box" total={box.success ? box.success : 0}>
          <DialogWrapper trigger="Add Box" heading="New Box">
            <BoxForm />
          </DialogWrapper>
        </ManageCard>
      </div>
      <div>
        <ManageCard
          cardTitle="Total Customer"
          total={customer.success ? customer.success : 0}
        >
          <Link href={"/customer/list"}>
            <Button variant="outline">Customer List</Button>
          </Link>
          <DialogWrapper trigger="Add Customer" heading="New customer">
            <CustomerForm />
          </DialogWrapper>
        </ManageCard>
      </div>
      <div>
        <ManageCard
          cardTitle="Total Booking"
          total={booking.success ? booking.success : 0}
        >
          <Link href={"/booking/list"}>
            <Button variant="outline">Booking List</Button>
          </Link>
          <DialogWrapper trigger="Add Booking" heading="New booking">
            <BookingForm />
          </DialogWrapper>
        </ManageCard>
      </div>
    </div>
  );
}
