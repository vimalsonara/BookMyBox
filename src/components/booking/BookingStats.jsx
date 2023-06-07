import { PropTypes } from 'prop-types';

function BookingStats(props) {
  return (
    <div className="flex h-20 w-40 flex-col items-center justify-center rounded-lg  bg-gradient-to-br from-purple-400 to-pink-400 p-4 font-bold text-white ">
      <h3>{props.collection}</h3>
      <p>{props.amount}</p>
    </div>
  );
}

BookingStats.propTypes = {
  collection: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
};

export default BookingStats;
