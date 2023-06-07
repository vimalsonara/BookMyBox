import { PropTypes } from 'prop-types';
import useBoxesStore from '../../store/boxStore';

function BookingDetails(props) {
  const { boxes } = useBoxesStore();
  const bookings = props.bookingDetails;
  console.log('boxes', boxes);
  return (
    <table className="w-3/4 border border-gray-200 bg-white">
      <thead className="bg-slate-400">
        <tr>
          <th className="px-4 py-2 text-left font-bold">Name</th>
          <th className="px-4 py-2 text-left font-bold">Date</th>
          <th className="px-4 py-2 text-left font-bold">Start Time</th>
          <th className="px-4 py-2 text-left font-bold">End Time</th>
          <th className="px-4 py-2 text-left font-bold">Price</th>
          <th className="px-4 py-2 text-left font-bold">Box</th>
        </tr>
      </thead>
      <tbody>
        {bookings.map((booking, index) => {
          // Find the matching box by ID
          const box = boxes.find((box) => box.$id === booking.boxId);

          // Display the box name if found
          const boxName = box ? box.box : 'Box Not Found';

          return (
            <tr
              key={booking.id}
              className={`${
                index % 2 === 0 ? 'bg-white' : 'bg-gray-200'
              } border border-b-2 hover:bg-blue-200`}
            >
              <td className="px-4 py-2">{booking.name}</td>
              <td className="px-4 py-2">{booking.date}</td>
              <td className="px-4 py-2">{booking.startTime}</td>
              <td className="px-4 py-2">{booking.endTime}</td>
              <td className="px-4 py-2">{booking.price}</td>
              <td className="px-4 py-2">{boxName}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

BookingDetails.propTypes = {
  bookingDetails: PropTypes.array.isRequired,
};

export default BookingDetails;
