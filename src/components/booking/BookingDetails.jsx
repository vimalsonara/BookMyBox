import { useState } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import useBoxesStore from '../../store/boxStore';
import { db } from '../../appwrite/appwriteConfig';

function BookingDetails(props) {
  const { boxes } = useBoxesStore();
  const bookings = props.bookingDetails;
  const [searchName, setSearchName] = useState('');

  // filter bookings as per name from searchName(state)
  const filteredBookings = bookings.filter((booking) =>
    booking.name.toLowerCase().includes(searchName.toLowerCase())
  );

  // delete booking when delete button clicked
  async function deleteBooking(bookingId) {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this booking?'
    );
    console.log(bookingId);
    if (confirmDelete) {
      try {
        await db.deleteDocument(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_BOOKING_COLLECTION_ID,
          bookingId
        );

        // Refresh the page
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className="overflow-x-auto p-2">
      <div className="mb-4">
        <label htmlFor="searchName"></label>
        <input
          type="text"
          id="searchName"
          value={searchName}
          placeholder="Search by Name"
          onChange={(e) => setSearchName(e.target.value)}
          className="border border-gray-300 rounded-md px-2 py-1 text-center w-full"
        />
      </div>
      <table className="w-full border border-gray-200 bg-white table-auto">
        <caption className="bg-slate-500 p-2 text-white text-lg font-bold">
          All Bookings
        </caption>
        <thead className="bg-slate-400">
          <tr>
            <th className="px-4 py-2 text-left font-bold">Name</th>
            <th className="px-4 py-2 text-left font-bold">Date & Box</th>
            <th className="px-4 py-2 text-left font-bold">Start & End</th>
            <th className="px-4 py-2 text-left font-bold">Price</th>
            <th className="px-4 py-2 text-left font-bold">Action</th>
          </tr>
        </thead>

        <tbody>
          {searchName === '' ? (
            // Display all bookings if no search term is entered
            bookings.map((booking, index) => {
              // Find the matching box by ID
              const box = boxes.find((box) => box.$id === booking.boxId);

              // Display the box name if found
              const boxName = box ? box.box : 'Box Removed';

              // format date as DD/MM/YY
              const formattedDate = format(new Date(booking.date), 'dd/MM/yy');

              return (
                <tr
                  key={booking.$id}
                  className={`${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-200'
                  } border border-b-2 hover:bg-blue-200`}
                >
                  <td className="px-4 py-2">{booking.name}</td>
                  <td className="px-4 py-2 row-span-2">
                    {formattedDate} - {boxName}
                  </td>
                  <td className="px-4 py-2">
                    {booking.startTime} - {booking.endTime}
                  </td>
                  <td className="px-4 py-2">{booking.price}</td>
                  <td className="px-4 py-2">
                    <button
                      className="text-red-500 font-bold"
                      onClick={() => {
                        deleteBooking(booking.$id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          ) : filteredBookings.length > 0 ? (
            // Display filtered bookings if search term is entered and matches found
            filteredBookings.map((booking, index) => {
              // Find the matching box by ID
              const box = boxes.find((box) => box.$id === booking.boxId);

              // Display the box name if found
              const boxName = box ? box.box : 'Box Removed';

              // format date as DD/MM/YY
              const formattedDate = format(new Date(booking.date), 'dd/MM/yy');

              return (
                <tr
                  key={booking.$id}
                  className={`${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-200'
                  } border border-b-2 hover:bg-blue-200`}
                >
                  <td className="px-4 py-2">{booking.name}</td>
                  <td className="px-4 py-2 row-span-2">
                    {formattedDate} - {boxName}
                  </td>
                  <td className="px-4 py-2">
                    {booking.startTime} - {booking.endTime}
                  </td>
                  <td className="px-4 py-2">{booking.price}</td>
                  <td className="px-4 py-2">
                    <button
                      className="text-red-500 font-bold"
                      onClick={() => {
                        deleteBooking(booking.$id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            // Display message if no bookings match the search term
            <tr>
              <td colSpan="5" className="text-center py-4">
                No bookings found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

BookingDetails.propTypes = {
  bookingDetails: PropTypes.array.isRequired,
};

export default BookingDetails;
