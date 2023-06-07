import { useState } from 'react';
import ReactDOM from 'react-dom';
import { format } from 'date-fns';
import { db } from '../../appwrite/appwriteConfig';
import { ID } from 'appwrite';

function NewBooking(props) {
  const [bookingDetails, setBookingDetails] = useState({
    name: '',
    date: '',
    startTime: '',
    endTime: '',
    price: '',
  });

  const [error, setError] = useState(false);
  const boxId = props.boxId;
  const userId = props.userData.$id;

  function handleInput(event) {
    const { name, value } = event.target;
    setBookingDetails((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const currentDate = new Date();
    const formattedCurrentDate = format(currentDate, 'dd/MM/yyyy');
    const selectedDate = new Date(bookingDetails.date);
    const formattedSelectedDate = format(selectedDate, 'dd/MM/yyyy');

    if (formattedSelectedDate < formattedCurrentDate) {
      setError('Selected date cannot be older than the current date');
      return;
    }

    if (
      bookingDetails.startTime &&
      bookingDetails.endTime &&
      bookingDetails.startTime >= bookingDetails.endTime
    ) {
      setError('End time must be greater than start time');
      return;
    }

    const promise = db.createDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_BOOKING_COLLECTION_ID,
      ID.unique(),
      { ...bookingDetails, userId, boxId }
    );
    promise.then(
      function (res) {
        console.log('Document created:', res);
        event.target.reset();
        props.onFormSubmit();
        window.location.reload();
      },
      function (err) {
        console.log(err);
      }
    );

    props.onFormSubmit();
  }

  return ReactDOM.createPortal(
    <>
      <div className="fixed bottom-0 left-0 right-0 top-0 bg-gray-500 opacity-50" />
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
        <form
          action=""
          className="flex flex-col items-center justify-center rounded-md bg-white p-10"
          onSubmit={handleSubmit}
        >
          <h1 className="font-bold">Booking Details:</h1>
          <label htmlFor="newBoxName"></label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Name"
            className="m-2 w-60  rounded-md border border-solid border-black py-1  pl-5 "
            onChange={handleInput}
            value={bookingDetails.name}
            required
          />
          <input
            id="date"
            name="date"
            type="date"
            placeholder="Name"
            className="m-2  w-60 rounded-md border border-solid border-black py-1 pl-5"
            onChange={handleInput}
            value={bookingDetails.date}
            required
          />
          <div className="m-2 flex h-8 w-60  items-center justify-around rounded-md border border-black ">
            <label htmlFor="startTime">Start Time:</label>
            <input
              type="time"
              id="startTime"
              name="startTime"
              className="focus:outline-none"
              value={bookingDetails.startTime}
              onChange={handleInput}
            />
          </div>

          <div className="m-2 flex h-8 w-60 items-center justify-around rounded-md border border-black">
            <label htmlFor="endTime">End Time:</label>
            <input
              type="time"
              id="endTime"
              name="endTime"
              className="focus:outline-none"
              value={bookingDetails.endTime}
              onChange={handleInput}
            />
          </div>

          <label htmlFor="price"></label>
          <input
            type="number"
            className="m-2  w-60 rounded-md border border-solid border-black py-1 pl-5"
            placeholder="Enter Price"
            step="100"
            id="price"
            name="price"
            value={bookingDetails.price}
            onChange={handleInput}
          />

          {error && (
            <p className="m-4 bg-yellow-500 p-2 font-bold text-red-500">
              {error}
            </p>
          )}
          <div className="flex items-center gap-4">
            <button
              className="mt-2 w-20 rounded-lg  bg-yellow-500 p-2 font-bold text-white hover:bg-yellow-600"
              onClick={props.onFormSubmit}
            >
              Close
            </button>
            <button className="mt-2 w-20 rounded-lg  bg-green-500 p-2 font-bold text-white hover:bg-green-600">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>,
    document.getElementById('portal')
  );
}

export default NewBooking;
