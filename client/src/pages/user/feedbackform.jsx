import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import DashNavigation from '../../components/dashnav';

const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

const FeedbackForm = () => {

  const [userFeedbackData, setUserFeedbackData] = useState({
    email: '',
    comment: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {

    const {name, value} = e.target;
    setUserFeedbackData({...userFeedbackData, [name]: value});
}

  const feedbackClicked = async (e) => {

    e.preventDefault();

    const { email, comment } = userFeedbackData;

    if ( !comment || !email) {

      Swal.fire({
        title: 'Submission failed',
        text: 'All fields are required.',
        icon: 'error',
        confirmButtonText: 'OK',
      });

      return; 
    }

    try {

       await axios.post(`${baseUrl}/api/user-feedback`, userFeedbackData, {withCredentials: true});

       Swal.fire({
        title: 'Feedback submitted.',
        text: 'Press the button to continue.',
        icon: 'success',
        confirmButtonText: 'Return to dashboard'
      }).then((result) => {
        if(result.isConfirmed){
          navigate('/dashboard');
        }
      });

    }catch(err){

      console.error('Error submitting feedback:', err.response.data.message);

      Swal.fire({
          title: 'Submission failed',
          text: 'Something went wrong. Please try again later.',
          icon: 'error',
          confirmButtonText: 'OK',
      });
    }
}


  return (

    <>

    <DashNavigation />

    <div className='flex flex-col items-center justify-center gap-y-5 min-h-screen px-5'>

        <span className='text-2xl text-accent-color font-semibold'>How was your experience?</span>

        <div className='flex flex-col items-center border border-main-color shadow-md p-5 rounded-md w-full max-w-xl'>
  
          <form className='w-full flex flex-col gap-5 p-2' onSubmit={feedbackClicked}>
            
            <div className='flex flex-col gap-y-1'>
              <label htmlFor="Email" className='text-text-color text-sm'>Email</label>
              <input type="email" 
              name='email' 
              id='Email'
              className='w-full border border-main-color outline-0 p-2 rounded-md text-sm focus:border-accent-color'  
              placeholder='Email'
              onChange={handleChange}
              value={userFeedbackData.email}
              />
            </div>

            <div className='flex flex-col gap-y-1'>
              <label htmlFor="" className='text-text-color text-sm'>Comment</label>
              <textarea 
              name="comment" 
              id="Comment" 
              maxLength={100}
              className='w-full border border-main-color outline-0 p-2 text-text-color rounded-md h-40 max-h-50 resize-none text-sm focus:border-accent-color' 
              placeholder='Leave your comment here...'
              onChange={handleChange}
              value={userFeedbackData.comment}>
      
              </textarea>
            </div>

            <button className='bg-accent-color p-3 rounded-md text-text-color text-sm cursor-pointer opacity-90 hover:opacity-100' type='submit'>
              Submit
            </button>

          </form>


        </div>
      
    </div>

    </>
  )
}

export default FeedbackForm;
