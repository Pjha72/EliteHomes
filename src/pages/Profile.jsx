import React, { useState } from 'react'
import { getAuth, updateProfile } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { doc, updateDoc} from 'firebase/firestore';
import { db } from "../firebase"
import {FcHome} from 'react-icons/fc'

export default function Profile() {
  const [changeDetails, setChangeDetails] = useState(false);
  const auth = getAuth();
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  });

  const {name,email} = formData;
  const navigate = useNavigate();
  function onLogout (){
    auth.signOut()
    navigate("/");
  }

  function onChange(e){
    setFormData((prevState)=>({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }
  async function onSubmit(){
    try {
      if(auth.currentUser.displayName !== name){
        // update displayname in firebase authentication
        await updateProfile(auth.currentUser,{
          displayName: name,
        });

        //update the name in firestore
        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef,{
         name
        });
      }
      toast.success("Profile Details Updated");
    } catch (error) {
      toast.error("Could not update the profile details")
    }
  }
  return (
    <>
      <section className='max-w-6xl mx-auto flex justify-center items-center flex-col'>
        <h1 className='text-3xl text-center mt-6 font-bold'>My Profile</h1>
        <div className='w-full md:w-[50%] mt-6 px-3'>
          <form >
            <input type="text" id='name' name='name' value={name} placeholder='FullName' disabled={!changeDetails} onChange={onChange} className={`mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out ${changeDetails && "bg-red-200 focus:bg-red-200"}`}/>
            <input type="email" id='email' name='email' value={email} placeholder='Email....' disabled={!changeDetails} className={`w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out mb-6 ${changeDetails && "bg-red-200 focus:bg-red-200"}` } />
            
            
            <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
              <p className='flex items-center' >Do you want to change your name?
                  <span onClick={() =>{
                    changeDetails && onSubmit();
                    setChangeDetails((prevState)=>!prevState)}}
                   className='text-red-600 hover:text-red-700 transition ease-in-out duration-200 ml-1 cursor-pointer'
                  >
                    {changeDetails ? "Apply change" : "Edit"}
                  </span>
              </p>
              <p className='text-blue-600 hover:text-blue-800 transition ease-in-out duration-200 cursor-pointer' onClick={onLogout}>Sign Out</p>
            </div>
          </form>
            <button type='submit' className='w-full bg-blue-600 text-white uppercase px-7 py-3 text-sm font-medium rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800'>
            <Link to="/create-listing" className='flex justify-center items-center'>
              <FcHome className='mr-2 text-3xl bg-red-200 rounded-full p-1 border-2'/>
              Sell or rent your home
            </Link>
            </button>
        </div>
      </section>
    </>
  )
}
