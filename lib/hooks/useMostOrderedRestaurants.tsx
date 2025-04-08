// Queries
import { MOST_ORDER_RESTAURANTS } from "@/lib/api/graphql/queries";
// UseQuery
import { useQuery } from "@apollo/client";
// interfaces
import { IMostOrderedRestaurantsData } from "../utils/interfaces/restaurants.interface";

const useMostOrderedRestaurants = () => {
    const { data, loading, error, networkStatus } = useQuery<IMostOrderedRestaurantsData>(MOST_ORDER_RESTAURANTS, {
        variables: {
          latitude: 33.6995,
          longitude: 73.0363,
         },
         fetchPolicy: 'cache-and-network'
    });
    
    return {
        data, loading, error, networkStatus
    }
}

export default useMostOrderedRestaurants;