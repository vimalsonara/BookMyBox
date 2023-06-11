import Avatar from 'react-avatar';
import useAuthStore from '../store/useAuthStore';
import useBoxesStore from '../store/boxStore';
import { Link, useNavigate } from 'react-router-dom';

function Header(props) {
  const { userDetails, logout } = useAuthStore();
  const { clearBoxes } = useBoxesStore();
  const navigate = useNavigate();

  // logout session
  function handleLogout() {
    logout();
    navigate('/');
    clearBoxes();
  }
  return (
    <header className="mb-5  rounded-b-2xl bg-pink-500/40 p-2 ">
      <nav className="flex justify-center sm:justify-between">
        <div className="w-30 rounded border border-white  p-2 font-bold text-white hover:border-black hover:text-black hover:shadow-md hover:shadow-black">
          <Link to={props.path}>{props.nav}</Link>
        </div>
        <div className="ml-3">
          <Avatar name={userDetails.name} round color="#0055d1" size="50" />
          <button
            className="mx-2 w-20 rounded border border-white p-2 font-bold text-white  hover:border-black hover:text-black hover:shadow-md hover:shadow-black"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
