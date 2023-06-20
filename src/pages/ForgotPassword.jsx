import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import OAuth from '../components/OAuth';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'react-toastify';

export default function ForgotPassword() {
  const [email, setEmail] = useState("");


  function onChange(e) {
    setEmail(e.target.value);
  }

  async function onSubmit(e){
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth,email)
      toast.success("Email was sent");
    } catch (error) {
      toast.error("Could not send reset password")
    }
  }
  return (
    <section>
      <h1 className='text-3xl text-center mt-6 font-bold'>Forgot Password</h1>
      <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>
        {/* For Image */}
        <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
          <img src="https://cdn3d.iconscout.com/3d/premium/thumb/login-verified-6251835-5117015.png" alt="Key"
            className='w-full h-[85%] rounded-2xl' />
        </div>
        {/* For Form Data */}
        <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
          <form onSubmit={onSubmit}>
            <div>
              <input className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300
            rounded transition ease-in-out mb-6' type="email" id='email' value={email}
                onChange={onChange} placeholder='Email Address' />
            </div>
          
            <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
              <p className='mb-6'>Don't have a account?
                <Link to="/sign-out" className='text-red-600 hover:text-red-700 font-semibold ml-1 transition duration-200 ease-in-out'>Register</Link>
              </p>
              <p>
                <Link to="/sign-in" className='text-blue-600 hover:text-blue-800 font-semibold transition duration-200 ease-in-out'>Sign in instead</Link>
              </p>
            </div>
            <button type="submit" className='w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800 '>Send reset password</button>
            <div className='flex items-center my-4 before:border-t  before:flex-1  before:border-gray-300
          after:border-t  after:flex-1  after:border-gray-300'>
              <p className='text-center font-semibold mx-4'>OR</p>
            </div>
            <OAuth />
          </form>
        </div>
      </div>
    </section>
  )
}
