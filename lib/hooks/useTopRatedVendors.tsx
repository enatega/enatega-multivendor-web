// Queries
import { TOP_RATED_VENDORS } from "@/lib/api/graphql";
// useQuery
import { useQuery } from "@apollo/client";
// interfaces
import { ITopRatedVendorData } from "@/lib/utils/interfaces";

function useTopRatedVendors(enabled = true) {
  const { loading, error, data } = useQuery<ITopRatedVendorData>(
    TOP_RATED_VENDORS,
    {
      variables: {
        latitude: 33.6995,
        longitude: 73.0363,
      },
      fetchPolicy: "cache-and-network",
      skip: !enabled,
    }
  );
  let queryData = data?.topRatedVendorsPreview;
  return {
    queryData,
    error,
    loading,
  };
}
export default useTopRatedVendors;
