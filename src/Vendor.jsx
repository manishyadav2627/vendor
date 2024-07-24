import axios from "axios"
import { getDistance } from "geolib"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { BASE_URL } from "./constants"

const Vendor = () => {
  const {email} = useSelector(({app})=>app)

    const [data,setData] = useState({})
    const fetchData = async() => {
      let response = await axios.get(`${BASE_URL}/vendorsData`)
       if (response?.data?.users?.length > 0) {
        let mydata = response?.data?.users?.filter((item)=> item.email === email)
        if (mydata?.length > 0) {
          setData(mydata[0])
        }
       }
    }
    useEffect(()=>{
fetchData()
    },[])
    const calculateDistance = (myLocation,hisLocation) => {
      const distance = getDistance(myLocation, hisLocation);
      return distance
    }
    return(
<div className="w-full min-h-screen items-center bg-slate-50 gap-y-4 p-2 flex flex-col">
  {data?.contractorsData ? 
  data?.contractorsData?.map((item,i)=>(
    <div className="rounded w-[350px] p-4 shadow-sm bg-slate-200 flex-col flex" key={item.email+i}> 
    <div> Email : {item?.email} </div>
    <div> Service required : {item?.serviceType} </div>
    <div> Distance from your location : {calculateDistance(data?.location,item?.distance)} </div>
    <button type="button" className=" px-4 py-2 rounded-sm bg-blue-400"> Apply </button>
     </div>
  ))
  :
  <div> No contractors available as of now </div>
}

</div>
    )
}
export default Vendor