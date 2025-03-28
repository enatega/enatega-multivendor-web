// Queries
import { NEAR_BY_RESTAURANTS_PREVIEW } from "@/lib/api/graphql/queries";
// UseQuery
import { useQuery } from "@apollo/client";
import { INearByRestaurantsPreviewData } from "../utils/interfaces/restaurants.interface";

const useNearByRestaurantsPreview = () => {
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

export default useNearByRestaurantsPreview;