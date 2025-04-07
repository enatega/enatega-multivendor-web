import react,{useState,useEffect} from "react"
import { useQuery } from "@apollo/client";

export default useCountry()
{
    const { data, loading, error, networkStatus } = useQuery<INearByRestaurantsPreviewData>(NEAR_BY_RESTAURANTS_PREVIEW, {
        variables: {
          latitude: 33.6995,
          longitude: 73.0363,
          shopType: null,
         },
         fetchPolicy: 'cache-and-network'
    });
    
    return {
        data, loading, error, networkStatus
    }
}