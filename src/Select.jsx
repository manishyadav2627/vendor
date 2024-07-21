import React, { useState } from 'react';

const Select = ({ options, onChange,text }) => {
  const [selected, setSelected] = useState('');

  const handleChange = (event) => {
    const value = event.target.value;
    setSelected(value);
    onChange(value);
  };

  return (
    <div className="relative">
      <select
        value={selected}
        onChange={handleChange}
        className="block w-full bg-white border border-gray-300 rounded p-2 text-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="" disabled>{text}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
