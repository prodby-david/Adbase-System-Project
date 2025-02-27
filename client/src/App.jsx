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
import AdminRegistration from './pages/adminregister';
import AdminLogin from './pages/adminlogin';
import AdminDashboard from './pages/admin-dashboard';


function App() {

  useEffect(() => {
    AOS.init(); 
  }, []);


  return (

      <AuthProvider>
          <Router>
            <Routes>
              <Route path='*' element={<Error />} />
              <Route path='/' element={<LandingPage />} />
              <Route path='/about' element={<About />} />
              <Route path='/signin' element={<SignIn />} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/admin-registration' element={<AdminRegistration />} />     
              <Route path='/admin' element={<AdminLogin />} />   
              <Route path='/admin-dashboard' element={<AdminDashboard />} />
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
