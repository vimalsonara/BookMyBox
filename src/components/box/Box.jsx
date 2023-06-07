import { PropTypes } from 'prop-types';
import { useState } from 'react';
import NewBooking from '../booking/NewBooking';

function Box(props) {
  const [isOpen, setIsOpen] = useState(false);

  const boxId = props.boxId;
  const userData = props.userData;
  // close NewBooking form when submit
  function handleFormSubmit() {
    setIsOpen(false);
  }

  return (
    <>
      <div className="flex h-40 w-40  flex-col items-center justify-center rounded-md  bg-gradient-to-r from-green-300   to-green-500 shadow shadow-black hover:bg-gradient-to-l ">
        <h3>{props.boxName}</h3>
        <button
          className="mt-3 h-10 w-20 rounded-md border border-white p-2 font-bold text-white hover:border-black hover:font-bold  hover:text-black hover:shadow-md hover:shadow-black"
          onClick={() => setIsOpen(true)}
        >
          Book
        </button>
      </div>

      {/* when Book button click it will show NewBooking */}
      {isOpen && (
        <div>
          <NewBooking
            onFormSubmit={handleFormSubmit}
            boxId={boxId}
            userData={userData}
          />
        </div>
      )}
    </>
  );
}

Box.propTypes = {
  boxName: PropTypes.string.isRequired,
  boxId: PropTypes.string.isRequired,
  userData: PropTypes.object.isRequired,
};

export default Box;
