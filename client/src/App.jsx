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
import ForgotPassword from './pages/forgotpassword';
import DashNavigation from './components/dashnav';
import { AdminContextProvider } from './context/adminContext';
import AdminRoute from './router/adminRoute';
import FAQ from './pages/faq';
import ResetPassword from './pages/reset-password'; 


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
              <Route path='/faq' element={<FAQ />} />
              <Route path='/signin' element={<SignIn />} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/forgot-password' element={<ForgotPassword />} />
              <Route path='/reset-password/:token' element={<ResetPassword />} /> 

              {/* User Routes */}
              <Route path='/user-feedback'
              element={
                <ProtectedRoute>
                  <FeedbackForm />
                </ProtectedRoute>} 
                />

              {/* Admin Routes */}
              <Route path='/admin-registration' element={<AdminRegistration />} />     
              <Route path='/admin-sign-in' element={<AdminLogin />} />   
              <Route path='/admin-dashboard' 
              element={
                <AdminContextProvider>
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                </AdminContextProvider>} 
                />
              <Route path='/dashboard'
               element={
                <ProtectedRoute>
                  <DashNavigation />
                  <Dashboard />
                </ProtectedRoute>} 
                />

            </Routes>
          </Router>
      </AuthProvider>
   
  )
}

export default App;
