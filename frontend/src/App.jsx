import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Public Pages
import Home from './pages/Home';
import Menu from './pages/Menu';
import About from './pages/About';
import Contact from './pages/Contact';

// Admin Pages
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/sales"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/finance"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Redirect /admin to /admin/dashboard */}
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          
          {/* 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
