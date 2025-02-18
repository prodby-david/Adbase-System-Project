import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LandingPage from './pages/landingpage';
import SignIn from './pages/signin';
import SignUp from './pages/signup';


function App() {
 

  return (
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
      </Router>
  )
}

export default App;
