import { PropTypes } from 'prop-types';
import { useState } from 'react';
import NewBooking from '../booking/NewBooking';
import { db } from '../../appwrite/appwriteConfig';

function Box(props) {
  const [isOpen, setIsOpen] = useState(false);

  const boxId = props.boxId;
  // close NewBooking form when submit
  function handleFormSubmit() {
    setIsOpen(false);
  }

  // Delete box on delete button clicked
  async function deleteBox() {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this box?'
    );
    if (confirmDelete) {
      try {
        await db.deleteDocument(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_BOX_COLLECTION_ID,
          boxId
        );

        // Refresh the page
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <>
      <div className="flex h-40 w-40  flex-col items-center justify-center rounded-md  bg-gradient-to-r from-green-300   to-green-500 shadow shadow-black hover:bg-gradient-to-l ">
        <h3 className="text-lg font-bold">{props.boxName}</h3>
        <button
          className="mt-3 h-10 w-20 rounded-md border border-white p-2 font-bold text-white hover:border-black hover:font-bold  hover:text-black hover:shadow-md hover:shadow-black"
          onClick={() => setIsOpen(true)}
        >
          Book
        </button>
        <button
          className="mt-3 outline-yellow-500 h-10 w-20 rounded-md border border-white p-2 font-bold text-black bg-yellow-500   hover:bg-yellow-600 hover:border-black hover:font-bold  hover:text-white hover:shadow-md hover:shadow-black"
          onClick={deleteBox}
        >
          Delete
        </button>
      </div>

      {/* when Book button click it will show NewBooking */}
      {isOpen && (
        <div>
          <NewBooking onFormSubmit={handleFormSubmit} boxId={boxId} />
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
