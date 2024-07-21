import React, { useEffect, useState } from 'react';
import Location from './Location';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Vendor from './Vendor';
import Contractor from './ContractorPage';


const Third = () => {
  const {success,email,isVendor} = useSelector(({app})=> app)

  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState({});
  const navigate = useNavigate();

   useEffect(()=>{
    !success && navigate('/login');
   },[])
  return(
    <div className='w-full p-4 min-h-screen bg-slate-50 justify-center flex flex-col gap-y-4 items-center '>
        <div className='w-full flex justify-end '>{email}</div>
        {isVendor ? <Vendor /> : <Contractor />}
    </div>
  )
};

export default Third;
