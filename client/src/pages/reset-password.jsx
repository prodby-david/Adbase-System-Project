import React from 'react'

const ResetPassword = () => {
  return (
    <div>
        <div>
            <h1>Reset Password</h1>
            <form>
                <div>
                    <label htmlFor="password">New Password</label>
                    <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    required />
                </div>
                <div>
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input 
                    type="password" 
                    id="confirm-password" 
                    name="confirm-password" 
                    required />
                </div>
                <button type="submit">Reset Password</button>
            </form>
        </div>
    </div>
  )
}

export default ResetPassword;
