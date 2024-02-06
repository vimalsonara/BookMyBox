export type BookingType = {
  bookingId: string;
  box: string | null;
  customerName: string | null;
  customerNumber: string | null;
  price: number;
  bookingDate: string;
  bookingStartTime: string;
  bookingEndTime: string;
};

export type WeekCollection = {
  date: string;
  total: number;
};

export type CustomerType = {
  id: string;
  customerName: string;
  customerNumber: string;
  createdAt: string;
};
