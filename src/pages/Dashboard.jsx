import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NewBox from '../components/box/NewBox';
import Box from '../components/box/Box';
import { db } from '../appwrite/appwriteConfig';
import useAuthStore from '../store/useAuthStore';
import useBoxesStore from '../store/boxStore';
import Header from '../components/Header';

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  // UserDetails from Authstore
  const { userDetails } = useAuthStore();
  // Store get & set Boxes
  const { boxes, setBoxes } = useBoxesStore();

  // List documents(BOX)
  useEffect(() => {
    if (userDetails) {
      // get currentUserId from userDetails object
      const currentUserId = userDetails.$id;
      // list documents from database & collection
      const promise = db.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_BOX_COLLECTION_ID
      );

      promise.then(
        function (res) {
          // filter documents as per current user
          const filterDocuments = res.documents.filter(
            (document) => document.userId === currentUserId
          );
          setBoxes(filterDocuments);
          setLoading(false);
        },
        function (err) {
          console.log('Error while fetching document:', err);
          setLoading(false);
        }
      );
    }
  }, [userDetails]);

  // close NewBox form when submit
  function handleFormSubmit() {
    setIsOpen(false);
  }
  return (
    <div className="h-full">
      {loading ? (
        <p className="flex justify-center items-center h-full font-bold text-lg">
          Loading...
        </p>
      ) : userDetails ? (
        <>
          <Header path="/bookings" nav="Bookings" />
          <div className="flex justify-center">
            <button
              className="mb-4 h-10 w-40  rounded border border-transparent border-white p-2 font-bold text-white hover:border-black  hover:text-black hover:shadow-md hover:shadow-black"
              onClick={() => setIsOpen(true)}
            >
              Add New Box
            </button>
          </div>

          {/* when Add New Box button clicked it will show Newbox */}
          {isOpen && (
            <div>
              <NewBox
                open={isOpen}
                close={() => setIsOpen(false)}
                onFormSubmit={handleFormSubmit}
              />
            </div>
          )}

          {/* Box list */}
          <div className="m-4 flex flex-wrap justify-center gap-4 sm:items-center">
            {boxes.map((box) => (
              <Box
                key={box.$id}
                boxName={box.box}
                createdAt={box.$createdAt}
                boxId={box.$id}
                userData={userDetails}
              />
            ))}
          </div>
        </>
      ) : (
        <div>
          <p>Please login to see profie</p>
          <Link to={'/'}>Login</Link>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
