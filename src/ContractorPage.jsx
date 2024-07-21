import { useState } from "react"
import Select from "./Select";
import { kmsOptions } from "./data";
import Location from "./Location";
import { options } from "./OptionsData";
import axios from "axios";
import { filteredLocations } from "./utils";
import { useSelector } from "react-redux";
import { BASE_URL } from "./constants";


const Contractor = () => {
    const {email} = useSelector(({app})=>app)
    const [error, setError] = useState('');

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
    return(
        <div className=" w-full bg-slate-50 flex flex-col gap-y-4">
            {error && <div className="text-red-400 text-xl font-semibold"> {error} </div> }
    <div className="p-2">
      <h1 className="text-2xl font-bold mb-4">{'Select service type'} </h1>
      <Select options={options} onChange={handleSelectChange} text={'Select service type'} />
      <p className="mt-4 text-gray-700">Selected service: {selectedOption}</p>
    </div>
    <div className="p-2">
      <h1 className="text-2xl font-bold mb-4">{'Select range of vendors in kms'} </h1>
      <Select options={kmsOptions} onChange={handleSelectChange2} text={'Range in kms'} />
      <p className="mt-4 text-gray-700">Selected kms: {selectedKms}</p>
    </div>
    <div className="p-2">
      <h1 className="text-2xl font-bold mb-4">{'Select range of vendors in kms'} </h1>
      <Location address={address} setAddress={setAddress} setCoordinates={setCoordinates} />
    </div>
    <button
          type="button"
          className="px-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          onClick={async()=>{
if (coordinates && selectedKms && selectedOption) {
    let m = await axios.get(`${BASE_URL}/vendorsData`)
    if (m?.data?.users?.length >0) {
    let data = m.data.users
    let matchingData = filteredLocations(data,coordinates,selectedKms)
    if (matchingData?.length > 0) {
        let m = await axios.post(`${BASE_URL}/contractorPostAdd`,{emails:matchingData,contractor:{
            email,
            serviceType:selectedOption,
            distance:coordinates
        }})
        if (m.data.message === "Contractor data added successfully!") {
            console.log('success')
        }else{
            setError('Contractor data not added')
        }
    }else{
        setError('No matching users found try modifying your request')
    }
                    // generate emails of matching vendors
    // add this contractor details in vendor obj data
    } else {
        setError('No vendors present')
    }
} else {
    setError('Incomplete details!!')

}

          }}
        >
          Post Add
        </button>
      </div>
    )
}
export default Contractor