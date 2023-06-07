import { useEffect, useState } from 'react';
import useAuthStore from '../store/useAuthStore';
import { db } from '../appwrite/appwriteConfig';
import { isToday, isThisWeek, isThisMonth, isThisYear } from 'date-fns';
import { Link, useNavigate } from 'react-router-dom';
import BookingStats from '../components/booking/BookingStats';
import BookingDetails from '../components/booking/BookingDetails';
import Avatar from 'react-avatar';

function Bookings() {
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const { userDetails, logout } = useAuthStore();

  const navigate = useNavigate();

  useEffect(() => {
    if (userDetails) {
      const currentUserId = userDetails.$id;
      const promise = db.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_BOOKING_COLLECTION_ID
      );

      promise.then(
        function (res) {
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

  function handleLogout() {
    logout();
    navigate('/');
  }
  console.log(bookings);

  // Calculate amount based on time periods
  const todayAmount = bookings
    .filter((booking) => isToday(new Date(booking.date)))
    .reduce((total, booking) => total + Number(booking.price), 0);

  const thisWeekAmount = bookings
    .filter((booking) => isThisWeek(new Date(booking.date)))
    .reduce((total, booking) => total + Number(booking.price), 0);

  const thisMonthAmount = bookings
    .filter((booking) => isThisMonth(new Date(booking.date)))
    .reduce((total, booking) => total + Number(booking.price), 0);

  const thisYearAmount = bookings
    .filter((booking) => isThisYear(new Date(booking.date)))
    .reduce((total, booking) => total + Number(booking.price), 0);

  console.log('today:', todayAmount);
  console.log('week:', thisWeekAmount);

  return (
    <div>
      {userDetails ? (
        <>
          {loading ? (
            <p>Please wait...</p>
          ) : (
            <div>
              <div className="mb-5 flex justify-between rounded-b-2xl bg-pink-500/40 p-2">
                <div className="w-30 rounded border  border-white  p-2 font-bold text-white hover:border-black hover:text-black hover:shadow-md hover:shadow-black">
                  <Link to={'/dashboard'}>Home</Link>
                </div>
                <div>
                  <Avatar
                    name={userDetails.name}
                    round
                    color="#0055d1"
                    size="50"
                  />
                  <button
                    className="mx-2 w-20 rounded border border-white p-2 font-bold text-white  hover:border-black hover:text-black hover:shadow-md hover:shadow-black"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </div>
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
