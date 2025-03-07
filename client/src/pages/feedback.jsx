import React, { useState, useEffect } from 'react'
import Navigation from '../components/navigation';

const Feedback = () => {

    const [feedback, setFeedback] = useState([]);

  return (

    <div>
        <Navigation />

        <div className='flex flex-col items-center justify-center mt-30'>

           <div className='text-center'>
            <h1 className='text-accent-color text-3xl font-semibold'>Feedback and Reviews</h1>
            <p className='text-text-color'>Take a look at the users feedback</p>
           </div>

            {feedback.length === 0 ? (
            <p className='text-text-color mt-10'>No feedback available.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-[100px]">
              {feedback.map((feedback, index) => (
                <div key={index} className="w-full max-w-lg border border-accent-color p-4 rounded-sm shadow-sm">
                  <h3 className="text-lg font-semibold text-accent-color">{feedback.fullname}</h3>
                  <p className="text-sm text-text-color">{feedback.email}</p>
                  <p className="mt-4">{feedback.comment}</p>
                </div>
              ))}
            </div>
            )}

        </div>
      
    </div>

  )
}

export default Feedback;
