import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { reset, setIsVendor } from './appSlice';

const First = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const {isVendor} = useSelector(({app})=> app)
  const goToPage2 = () => {
    navigate('/login');
  };
  useEffect(()=>{
dispatch(reset())
  },[])

  return(
    <div className='w-full min-h-screen justify-center flex-col gap-y-4 bg-slate-100 flex items-center gap-x-4'>
        <p>WHO YOU ARE ?</p>
       <div className='flex justify-center items-center gap-x-4'>
       <h2 className={`${isVendor === false ? 'bg-gray-500 text-white' : 'bg-gray-200 text-black'} px-4 py-2 rounded cursor-pointer`}  onClick={()=>dispatch(setIsVendor(false))}>Contractor</h2>
          <h2 className={` ${isVendor ? 'bg-gray-500 text-white' : 'bg-gray-200 text-black'} px-4 py-2 rounded cursor-pointer`}  onClick={()=>{
            dispatch(setIsVendor(true));
            }}>Vendor</h2>
       </div>
       <button disabled={isVendor===null} className={` disabled:cursor-not-allowed bg-blue-500 text-white' px-4 py-2 rounded cursor-pointer`}  onClick={()=>{
            ((isVendor === false) || isVendor )&& goToPage2()
            }}>Submit</button>
    </div>
  )
};

export default First;
