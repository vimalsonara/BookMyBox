import Avatar from 'react-avatar';
import useAuthStore from '../store/useAuthStore';
import useBoxesStore from '../store/boxStore';
import { Link, useNavigate } from 'react-router-dom';
import { PropTypes } from 'prop-types';

function Header(props) {
  const { userDetails, logout } = useAuthStore();
  const { clearBoxes } = useBoxesStore();
  const navigate = useNavigate();

  // logout session, redirect to login page & clear localstorage of box data
  function handleLogout() {
    logout();
    navigate('/');
    clearBoxes();
  }
  return (
    <header className="mb-5  rounded-b-2xl bg-pink-500/40 p-2 ">
      <nav className="flex justify-center sm:justify-between">
        <div className="w-30 rounded border border-white  p-2 font-bold text-white hover:border-black hover:text-black hover:shadow-md hover:shadow-black">
          {/* link to page which provided via props */}
          <Link to={props.path}>{props.nav}</Link>
        </div>
        <div className="ml-3">
          {/* set first letter of name as Avatar */}
          <Avatar name={userDetails.name} round color="#0055d1" size="50" />
          {/* on click handleLogout */}
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

Header.propTypes = {
  path: PropTypes.string.isRequired,
  nav: PropTypes.string.isRequired,
};

export default Header;
