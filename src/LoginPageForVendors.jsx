import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setEmail, setSuccess } from './appSlice';
import { BASE_URL } from './constants';

const LoginPageForVendors = () => {
  const dispatch = useDispatch()
  const {success,email} = useSelector(({app})=> app)
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const goToPage3 = () => {
    navigate('/details');
  };
  const handleLogin = async (e) => {
    setError('')
    e.preventDefault();

    try {
      const response = await axios.post(`${BASE_URL}/loginForVendors`, {
        email,
        password,
      });
      dispatch(setSuccess('Login successful!'));
      // dispatch(setEmail(''));
      setPassword('');
      goToPage3()
    } catch (err) {
      setError(err.response?.data?.message || 'Error during login');
    }
  };

  return (
    <div className="bg-white p-2 rounded shadow-md w-full max-w-sm">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <form onSubmit={handleLogin}>
        <label className="block mb-2">
          Email:
          <input
            type="email"
            className="mt-1 block w-full border border-gray-300 rounded p-2"
            value={email}
            onChange={(e) => dispatch(setEmail(e.target.value))}
            required
          />
        </label>
        <label className="block mb-4">
          Password:
          <input
            type="password"
            className="mt-1 block w-full border border-gray-300 rounded p-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPageForVendors;
