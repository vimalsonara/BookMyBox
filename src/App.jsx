import { Routes, Route } from 'react-router-dom';
import useAuthStore from './store/useAuthStore';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Bookings from './pages/Bookings';
import AuthRoutes from './routes/AuthRoutes';
import AdminRoutes from './routes/AdminRoutes';
import './App.css';

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  console.log(isAuthenticated);
  const authRoutes = (
    <Routes>
      <Route exact path="" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );

  const adminRoutes = (
    <Routes>
      <Route path="" index element={<Dashboard />} />
      <Route path="/bookings" index element={<Bookings />} />
    </Routes>
  );

  return (
    <>
      {!isAuthenticated ? (
        <AuthRoutes>{authRoutes}</AuthRoutes>
      ) : (
        <AdminRoutes>{adminRoutes}</AdminRoutes>
      )}
    </>
  );
}

export default App;
