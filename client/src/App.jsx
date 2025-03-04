import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AOS from "aos";
import "aos/dist/aos.css";
import LandingPage from './pages/landingpage';
import SignIn from './pages/signin';
import SignUp from './pages/signup';
import Error from './pages/error';
import About from './pages/about';
import Dashboard from './pages/dashboard';
import { AuthProvider } from './context/authContext';
import ProtectedRoute from './router/protectedRoute';
import AdminRegistration from './pages/admin/adminregister';
import AdminLogin from './pages/admin/adminlogin';
import AdminDashboard from './pages/admin/admin-dashboard';
import Feedback from './pages/feedback';
import FeedbackForm from './pages/user/feedbackform';


function App() {

  useEffect(() => {
    AOS.init(); 
  }, []);


  return (

      <AuthProvider>
          <Router>
            <Routes>

            <Route path='*' element={<Error />} />

              {/* General Routes */}
              <Route path='/' element={<LandingPage />} />
              <Route path='/about' element={<About />} />
              <Route path='/feedback' element={<Feedback />} />
              <Route path='/signin' element={<SignIn />} />
              <Route path='/signup' element={<SignUp />} />

              {/* User Routes */}
              <Route path='/user-feedback'
              element={
                <ProtectedRoute>
                  <FeedbackForm />
                </ProtectedRoute>} 
                />

              {/* Admin Routes */}
              <Route path='/admin-registration' element={<AdminRegistration />} />     
              <Route path='/admin' element={<AdminLogin />} />   
              <Route path='/admin-dashboard' 
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>} 
                />
              <Route path='/dashboard'
               element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>} 
                />

            </Routes>
          </Router>
      </AuthProvider>

  )
}

export default App;
