import { PropTypes } from 'prop-types';
import { format } from 'date-fns';
import useBoxesStore from '../../store/boxStore';

function BookingDetails(props) {
  const { boxes } = useBoxesStore();
  const bookings = props.bookingDetails;
  return (
    <div className="overflow-x-auto p-2">
      <table className="w-full border border-gray-200 bg-white table-auto">
        <thead className="bg-slate-400">
          <tr>
            <th className="px-4 py-2 text-left font-bold">Name</th>
            <th className="px-4 py-2 text-left font-bold">Date & Box</th>
            <th className="px-4 py-2 text-left font-bold">Start & End</th>
            <th className="px-4 py-2 text-left font-bold">Price</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((booking, index) => {
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
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

BookingDetails.propTypes = {
  bookingDetails: PropTypes.array.isRequired,
};

export default BookingDetails;
