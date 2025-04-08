// Queries
import { GET_CUISINES } from "../api/graphql/queries";
// useQuery
import { useQuery } from "@apollo/client";
// interfaces
import { ICuisinesData } from "../utils/interfaces/cuisines.interface";

const useGetCuisines = () => {
    const {data, loading, error, networkStatus} = useQuery<ICuisinesData>(GET_CUISINES)
    return {
        data, loading, error, networkStatus
    }
}

export default useGetCuisines;