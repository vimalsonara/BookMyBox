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
  // get isAuthenticated(boolean) from Authstore
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // Authentication routes
  const authRoutes = (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route exact path="*" element={<Login />} />
    </Routes>
  );

  // Private routes
  const adminRoutes = (
    <Routes>
      <Route path="/dashboard" index element={<Dashboard />} />
      <Route path="/bookings" index element={<Bookings />} />
    </Routes>
  );

  return (
    <>
      {/* If not Authenticated than redirect to Auth routes else Admin routes */}
      {!isAuthenticated ? (
        <AuthRoutes>{authRoutes}</AuthRoutes>
      ) : (
        <AdminRoutes>{adminRoutes}</AdminRoutes>
      )}
    </>
  );
}

export default App;
