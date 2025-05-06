

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './components/DashBoard';
import Round from './components/Round';
import Round2 from './components/Round2';
import Admin from './components/Admin';
import Round3 from './components/Round3';
import Progress from './components/Progress';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './context/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes> {/* Ensure all Routes are inside <Routes> */}
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Routes */}
          <Route 
            path="/dashboard" 
            element={<PrivateRoute element={<Dashboard />} />} 
          />
          <Route 
            path="/round1" 
            element={<PrivateRoute element={<Round />} />} 
          />
          <Route 
            path="/round2" 
            element={<PrivateRoute element={<Round2 />} />} 
          />
          <Route 
            path="/leader" 
            element={<PrivateRoute element={<Progress />} />} 
          />
          <Route 
            path="/admin" 
            element={<PrivateRoute element={<Admin />} />} 
          />
          <Route 
            path="/round3" 
            element={<PrivateRoute element={<Round3 />} />} 
          />
        </Routes> {/* All Routes must be wrapped inside <Routes> */}
        <ToastContainer />
      </Router>
    </AuthProvider>
  );
  
}

export default App;


