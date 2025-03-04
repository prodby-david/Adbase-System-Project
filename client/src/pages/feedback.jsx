import React, { useState } from 'react'
import Navigation from '../components/navigation';

const Feedback = () => {

    const [feedback, setFeedback] = useState([]);

  return (

    <div className=''>
        <Navigation />

        <div>

           <div>
            <h1>Feedback and Reviews</h1>
            <p>Take a look at the users feedback</p>
           </div>

          

        </div>
      
    </div>

  )
}

export default Feedback;
