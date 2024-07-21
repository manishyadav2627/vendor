import React, { useState } from 'react';
import axios from 'axios';
import Select from './Select';
import Location from './Location';
import { kmsOptions } from './data';
import { options } from './OptionsData';
import { BASE_URL } from './constants';

const SignupForVendors = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState(null);
  const [selectedKms,setSelectedKms] = useState('')
  const [selectedOption, setSelectedOption] = useState('');
  
  const handleSelectChange = (value) => {
    setSelectedOption(value);
  };
  const handleSelectChange2 = (value) => {
      setSelectedKms(value);
    };

  const handleSignup = async (e) => {
    setError('')
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
        if (email && password && selectedOption && selectedKms &&  (Object.keys(coordinates)?.length > 0)) {
            const response = await axios.post(`${BASE_URL}/signupForVendors`, {
                email,
                password,
                service:selectedOption,
                kms:selectedKms,
                location:coordinates
              });
              setSuccess('Signup successful! You can now log in.');
              setEmail('');
              setPassword('');
              setConfirmPassword('');
        }else{
            setError('Please fill all details');
        }
    } catch (err) {
      setError(err.response?.data?.message || 'Error during signup');
    }
  };

  return (
    <div className="bg-white p-2 rounded shadow-md w-full max-w-sm">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      {!success && 
      <div>
      <form onSubmit={handleSignup}>
        <label className="block mb-2">
          Email:
          <input
            type="email"
            className="mt-1 block w-full border border-gray-300 rounded p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="block mb-2">
          Password:
          <input
            type="password"
            className="mt-1 block w-full border border-gray-300 rounded p-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label className="block mb-4">
          Confirm Password:
          <input
            type="password"
            className="mt-1 block w-full border border-gray-300 rounded p-2"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <div className="p-2">
      <h1 className="text-2xl font-bold mb-4">{'Which service you provide'} </h1>
      <Select options={options} onChange={handleSelectChange} text={'Select service type'} />
      <p className="mt-4 text-gray-700">Selected service: {selectedOption}</p>
    </div>
    <div className="p-2">
      <h1 className="text-2xl font-bold mb-4">{'In how much range you provide your services'} </h1>
      <Select options={kmsOptions} onChange={handleSelectChange2} text={'Range in kms'} />
      <p className="mt-4 text-gray-700">Selected kms: {selectedKms}</p>
    </div>
    <div className="p-2">
      <h1 className="text-2xl font-bold mb-4">{'Please select your location'} </h1>
      <Location address={address} setAddress={setAddress} setCoordinates={setCoordinates} />
    </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Signup
        </button>
      </form>

      </div>
      }
    </div>
  );
};

export default SignupForVendors;
