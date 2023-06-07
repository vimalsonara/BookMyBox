import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NewBox from '../components/box/NewBox';
import Box from '../components/box/Box';
import { db } from '../appwrite/appwriteConfig';
import useAuthStore from '../store/useAuthStore';
import useBoxesStore from '../store/boxStore';
import Avatar from 'react-avatar';

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const { userDetails, logout } = useAuthStore();
  const { boxes, setBoxes } = useBoxesStore();

  const navigate = useNavigate();

  useEffect(() => {
    if (userDetails) {
      const currentUserId = userDetails.$id;
      const promise = db.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_BOX_COLLECTION_ID
      );

      promise.then(
        function (res) {
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

  // logout session
  function handleLogout() {
    logout();
    navigate('/');
  }

  // close NewBox form when submit
  function handleFormSubmit() {
    setIsOpen(false);
  }
  console.log('Box:', boxes);
  return (
    <div className="h-full">
      {loading ? (
        <p>Loading...</p>
      ) : userDetails ? (
        <>
          <div className="mb-5 flex justify-between rounded-b-2xl bg-pink-500/40 p-2">
            {/* <img src="" alt="" /> */}
            <div className="w-30 rounded border  border-white  p-2 font-bold text-white hover:border-black hover:text-black hover:shadow-md hover:shadow-black">
              <Link to={'/bookings'}>Bookings</Link>
            </div>
            <div>
              <Avatar name={userDetails.name} round color="#0055d1" size="50" />
              <button
                className="mx-2 w-20 rounded border border-white p-2 font-bold text-white  hover:border-black hover:text-black hover:shadow-md hover:shadow-black"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
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
                userData={userDetails}
              />
            </div>
          )}

          {/* Box list */}
          <div className="m-4 flex h-full flex-wrap justify-center gap-4">
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
