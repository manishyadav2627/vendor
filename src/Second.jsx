import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import { useSelector } from 'react-redux';
import SignupForVendors from './SignupForVendors';
import LoginPageForVendors from './LoginPageForVendors';

const Second = () => {
  const {isVendor} = useSelector(({app})=> app)
  const navigate = useNavigate();

  const [isLogin,setIsLogin] = useState(true)
   useEffect(()=>{
    isVendor === null && navigate('/');
   },[])
  return(
    <div className='w-full min-h-screen justify-center flex-col gap-y-4 bg-slate-100 flex items-center gap-x-4'>
      <div className='flex justify-center items-center gap-x-4'>
       <h2 className={`${isLogin === false ? 'bg-gray-500 text-white' : 'bg-gray-200 text-black'} px-4 py-2 rounded cursor-pointer`}  onClick={()=>setIsLogin(false)}>SIGNUP</h2>
          <h2 className={` ${isLogin ? 'bg-gray-500 text-white' : 'bg-gray-200 text-black'} px-4 py-2 rounded cursor-pointer`}  onClick={()=>{
            setIsLogin(true);
            }}>LOGIN</h2>
       </div>
       {
        isLogin ? ( isVendor ? <LoginPageForVendors /> : <LoginPage /> ): (isVendor ? <SignupForVendors /> :  <SignupPage />)
       }
      
    </div>
  )
};

export default Second;
