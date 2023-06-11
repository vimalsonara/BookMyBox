import ReactDOM from 'react-dom';
import { PropTypes } from 'prop-types';
import { db } from '../../appwrite/appwriteConfig';
import { useState } from 'react';
import { ID } from 'appwrite';
import useBoxesStore from '../../store/boxStore';
import useAuthStore from '../../store/useAuthStore';
function NewBox(props) {
  const [box, setBox] = useState({
    newBoxName: '',
  });
  const [error, setError] = useState('');

  // All Box from BoxStore
  const { boxes } = useBoxesStore();

  // userDetails from AuthStore
  const { userDetails } = useAuthStore();
  const userId = userDetails.$id;

  //   handle form input
  function handleInput(event) {
    setBox((prevInput) => {
      const { name, value } = event.target;
      return {
        ...prevInput,
        [name]: value,
      };
    });
  }

  //   handle form submit
  function handleSubmit(event) {
    event.preventDefault();

    const trimmedBoxName = box.newBoxName.trim(); // Trim whitespace from input value

    // check if new box name is already exist
    const existingBox = boxes.find(
      (existingBox) =>
        existingBox.box.toLowerCase() === box.newBoxName.toLowerCase()
    );

    if (existingBox) {
      setError('Box name already exists!');
      return;
    }

    // create document in database in BOX collection
    const promise = db.createDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_BOX_COLLECTION_ID,
      ID.unique(),
      { box: trimmedBoxName, userId }
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
          <h1 className="font-bold">Enter New Box Name</h1>
          <label htmlFor="newBoxName"></label>
          <input
            id="newBoxName"
            name="newBoxName"
            type="text"
            placeholder="e.g Box 1"
            className="m-2 h-8  rounded-md border border-solid border-black p-4"
            onChange={handleInput}
            value={box.newBoxName}
            required
          />
          {/* display error if entered input is already exist */}
          {error && <p className="text-red-500">{error}</p>}

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

NewBox.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

export default NewBox;
