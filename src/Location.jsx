import React, { useState } from 'react';
import axios from 'axios';

const Location = ({setAddress,setCoordinates,address}) => {
    const [isLocation,setIsLocation] = useState(true)
    const [error,setError] = useState('')
    const handleAddressChange = (e) => {
      setAddress(e.target.value);
    };
  const handleAddressSubmit = async () => {
      try {
        const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
          params: {
            q: address,
            format: 'json',
          },
        });
        if (response.data.length > 0) {
          const location = response.data[0];
          setCoordinates({ latitude: location.lat, longitude: location.lon });
        } else {
          setError('No results found');
        }
      } catch (error) {
        setError('Error fetching geolocation');
      }
    };
    
    const handleGeolocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCoordinates({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => {
            setError('Error fetching geolocation');
          }
        );
      } else {
        setError('geolocation is not enabled');
      }
    };
  
    return (
      <div className=' w-full p-1 flex flex-col gap-y-4 items-center'>
        {error && <div className=' text-red-400 w-full flex justify-center items-center'> {error}</div> }
  <div className='flex gap-x-4 items-center p-1 w-full justify-center'>
          <h2 className={`${isLocation ? 'bg-gray-500 text-white' : 'bg-gray-200 text-black'} px-2 py-2 rounded cursor-pointer`}  onClick={()=>setIsLocation(true)}>Enter Address Manually:</h2>
          <h2 className={` ${!isLocation ? 'bg-gray-500 text-white' : 'bg-gray-200 text-black'} px-2 py-2 rounded cursor-pointer`}  onClick={()=>{
            setIsLocation(false);
            handleGeolocation()
            }}>Or Click to Allow Browser to Get Your Location:</h2>
  </div>
  <div> 
  {isLocation &&
  <div className=' flex justify-center items-center w-full gap-x-4'>
  <input type="text" className='h-10 px-2 border border-gray-300' value={address} onChange={handleAddressChange} />
  <button className='bg-gray-500 text-white px-2 py-2 rounded' onClick={handleAddressSubmit}>Submit</button>
  </div>
  }
  </div>
      </div>
    );
}
export default Location