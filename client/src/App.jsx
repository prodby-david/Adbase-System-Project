import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AOS from "aos";
import "aos/dist/aos.css";
import LandingPage from './pages/landingpage';
import SignIn from './pages/signin';
import SignUp from './pages/signup';
import Error from './pages/error';
import About from './pages/about';
import Dashboard from './pages/user/dashboard';
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
import CreateProduct from './pages/admin/create-product';
import ShowProducts from './pages/admin/showproduct';
import { ToastContainer } from 'react-toastify';
import Orders from './pages/user/orders';
import AdminOrders from './pages/admin/admin-orders';
import 'react-toastify/dist/ReactToastify.css';
import CartPage from './pages/user/cart';
import FavoritesPage from './pages/user/favorites';
import axios from 'axios';



function App() {  

  useEffect(() => {
    AOS.init(); 
  }, []);

  return (
    
      <AuthProvider>
          <AdminContextProvider>
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
                  </ProtectedRoute>
                  } 
                  />

                <Route path='/cart' element={
                  <ProtectedRoute>
                    <CartPage />
                  </ProtectedRoute>
                  } 
                />

                <Route path='/favorites' element={
                  <ProtectedRoute>
                    <FavoritesPage />
                  </ProtectedRoute>
                  } 
                />

                <Route path='/dashboard'
                element={
                  <ProtectedRoute>
                    <DashNavigation />
                    <Dashboard /> 
                  </ProtectedRoute>
                  } 
                  />

                  <Route path='/orders'
                    element={
                      <ProtectedRoute>
                        <DashNavigation />
                        <Orders /> 
                      </ProtectedRoute>
                      } 
                  />
              
                {/* Admin Routes */}
                <Route path='/admin-registration' element={<AdminRegistration />} />     
                <Route path='/admin' element={<AdminLogin />} />   
                <Route path='/admin-dashboard' 
                element={ 
                  <AdminRoute>
                    <AdminDashboard /> 
                  </AdminRoute>} 
                />
                <Route path='/admin-orders'
                element={
                  <AdminRoute>
                    <AdminOrders />
                  </AdminRoute>
                }
                />
                <Route path='/create-product' element={<CreateProduct />} />
                <Route path='/show-products' element={<ShowProducts />} />
                
            </Routes>

            <ToastContainer 
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={true}
            newestOnTop
            closeOnClick
            pauseOnHover
            theme='colored'
            />

          </Router>
          </AdminContextProvider>
      </AuthProvider>

      
   
  )
}

export default App;
