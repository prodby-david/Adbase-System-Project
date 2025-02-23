import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AOS from "aos";
import "aos/dist/aos.css";
import LandingPage from './pages/landingpage';
import SignIn from './pages/signin';
import SignUp from './pages/signup';
import Error from './pages/error';
import About from './pages/about';


function App() {

  useEffect(() => {
    AOS.init(); 
  }, []);


  return (
      <Router>
        <Routes>
          <Route path='*' element={<Error />} />
          <Route path='/' element={<LandingPage />} />
          <Route path='/about' element={<About />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
      </Router>
  )
}

export default App;
