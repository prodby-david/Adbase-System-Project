import React from 'react'

const Error = () => {
  return (

    <div >
        <div className='flex flex-col items-center justify-center min-h-screen'>
            <img src='broken-cookie.png' alt="broken-cookie" className='w-70 animate-bounce'/>
            <h2 className='text-3xl font-semibold text-main-color mt-1'>404 - Page Not Found</h2>
            <p className='text-md text-text-color'>Oops! The page you’re looking for doesn’t exist.</p>
            <ul className='mt-2 text-text-color'>
              <li className='list-inside list-disc'>Try checking the URL.</li>
              <li className='list-inside list-disc'>Go back to <a href="/" className='underline text-accent-color'>Homepage</a></li>
            </ul>
        </div>
    </div>

  )
}

export default Error;
