import { getDistance } from "geolib";

export  const filteredLocations = (users,myLocation,kms) =>{
   let matchingUsers = users.filter(user => {
        const distance = getDistance(myLocation, user.location);
        return distance <= (Number(kms) * 1000);
      });
      let matchingUsersEmails = matchingUsers?.map((item)=>item.email)
      return matchingUsersEmails;
}