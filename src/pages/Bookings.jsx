import { useEffect, useState } from 'react';
import useAuthStore from '../store/useAuthStore';
import { db } from '../appwrite/appwriteConfig';
import { isToday, isThisWeek, isThisMonth, isThisYear } from 'date-fns';
import { Link } from 'react-router-dom';
import BookingStats from '../components/booking/BookingStats';
import BookingDetails from '../components/booking/BookingDetails';
import Header from '../components/Header';

function Bookings() {
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);

  // userDetails from Auth Store
  const { userDetails } = useAuthStore();

  // get bookings list from database
  useEffect(() => {
    if (userDetails) {
      const currentUserId = userDetails.$id;
      const promise = db.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_BOOKING_COLLECTION_ID
      );

      promise.then(
        function (res) {
          // filter bookings as per current user
          const filterBookings = res.documents.filter(
            (booking) => booking.userId === currentUserId
          );
          setBookings(filterBookings);
          setLoading(false);
        },
        function (err) {
          console.log('Error while fetching document:', err);
          setLoading(false);
        }
      );
    }
  }, [userDetails]);

  // Calculate amount based on time periods
  // daily bookings amount
  const todayAmount = bookings
    .filter((booking) => isToday(new Date(booking.date)))
    .reduce((total, booking) => total + Number(booking.price), 0);
  // current week's booking amount
  const thisWeekAmount = bookings
    .filter((booking) => isThisWeek(new Date(booking.date)))
    .reduce((total, booking) => total + Number(booking.price), 0);
  // current month's booking amount
  const thisMonthAmount = bookings
    .filter((booking) => isThisMonth(new Date(booking.date)))
    .reduce((total, booking) => total + Number(booking.price), 0);
  // current year booking amount
  const thisYearAmount = bookings
    .filter((booking) => isThisYear(new Date(booking.date)))
    .reduce((total, booking) => total + Number(booking.price), 0);

  return (
    <div className="h-full">
      {userDetails ? (
        <>
          {loading ? (
            <p className="flex justify-center items-center h-full font-bold text-lg">
              Please wait...
            </p>
          ) : (
            <div>
              <Header path="/dashboard" nav="Home" />
              {/* Bookings collection total display as per current(Date, Week, Month & Year)*/}
              <div>
                {bookings.length > 0 ? (
                  <div>
                    <div className="flex flex-wrap justify-evenly gap-4">
                      <BookingStats
                        collection={'Today :'}
                        amount={todayAmount}
                      />
                      <BookingStats
                        collection={'This Week :'}
                        amount={thisWeekAmount}
                      />
                      <BookingStats
                        collection={'This Month :'}
                        amount={thisMonthAmount}
                      />
                      <BookingStats
                        collection={'This Year :'}
                        amount={thisYearAmount}
                      />
                    </div>
                    {/* Booking details component to display table of bookings */}
                    <div className="mt-6 flex  justify-center">
                      <BookingDetails bookingDetails={bookings} />
                    </div>
                  </div>
                ) : (
                  <p>No Boooking Found</p>
                )}
              </div>
            </div>
          )}
        </>
      ) : (
        <div>
          <p>Please login to see the profile</p>
          <Link to="/">Login</Link>
        </div>
      )}
    </div>
  );
}

export default Bookings;
