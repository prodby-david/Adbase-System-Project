import React from 'react'

const AdminRegistration = () => {
  return (
    <div className='flex items-center justify-center min-h-screen px-5'>

        <div className='flex flex-col items-center border border-accent-color p-10 rounded-md w-full max-w-md shadow-md'>

            <h2 className='text-xl font-semibold text-accent-color'>Admin Registration</h2>

            <form className='flex flex-col gap-y-5 mt-10 w-full'>

                <input type="text"
                placeholder='Username'
                name='adminuser'
                className='p-2 w-full border-0 border-b border-main-color outline-0 text-sm'
                required
                 />

                <input type="password"
                placeholder='Password'
                name='adminpass'
                className='p-2 w-full border-0 border-b border-main-color outline-0 text-sm'
                required
                 />

                <input type="password"
                placeholder='Confirm Password'
                name='adminconfirmpass'
                className='p-2 w-full border-0 border-b border-main-color outline-0 text-sm'
                required
                 />

                
            </form>

            <button className='text-md p-3 mt-10 bg-accent-color hover:opacity-100 opacity-90 w-[130px] rounded-md text-text-color cursor-pointer'>Register</button>
        </div>

    </div>
  )
}

export default AdminRegistration;
