"use client";

import React from "react";
import { useQuery, gql } from "@apollo/client";
import { GET_CITIES } from "@/lib/api/graphql/queries/Countries";
import ListItem from "@/lib/ui/useable-components/list-item";
import { useRouter } from "next/navigation";
import { useLocationContext } from "@/lib/context/Location/Location.context";
import {
  CitiesTilesProps,
  GetCitiesByCountryResponse,
  City,
  CountryItem,
} from "@/lib/utils/interfaces/Home-interfaces";

// Assets
import { CircleCrossSvg } from "@/lib/utils/assets/svg";

const CITIES = gql`
  ${GET_CITIES}
`;

const CitiesTiles: React.FC<CitiesTilesProps> = ({
  countryId,
  AllCountries,
}) => {
  const router = useRouter();
  const { setLocation } = useLocationContext();

  const { data, loading } = useQuery<GetCitiesByCountryResponse>(CITIES, {
    variables: { id: countryId },
    fetchPolicy: "cache-and-network",
  });

  const onCityClick = (item: City | CountryItem | void) => {
    if (!item || !("latitude" in item)) return;

    const city = item as City;

    setLocation({
      label: city.name,
      latitude: city.latitude,
      longitude: city.longitude,
      deliveryAddress: `Selected city: ${city.name}`,
      details: `Auto-selected from ${data?.getCitiesByCountry?.name}`,
    });

    router.push("/restaurants");
  };

  return (
    <div>
      <div className="flex w-full justify-start items-center gap-x-2">
        <p className="text-[#111827] font-semibold text-xl">Explore Cities</p>
        {data?.getCitiesByCountry?.name && (
          <div className="relative flex gap-x-2">
            <p className="text-[#94e469] border-2 border-[#94e469] px-2 rounded">
              {data?.getCitiesByCountry?.name}
            </p>

            {/* <button onClick={AllCountries}>All Countries</button> */}
            <div
              className="absolute -right-2 -top-2 cursor-pointer"
              onClick={AllCountries}
            >
              <CircleCrossSvg color="#ff0000" height={22} width={22} />
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-6 items-center justify-start my-[30px]">
        {loading ?
          [...Array(8)].map((_, index) => (
            <ListItem key={index} loading={true} onClick={() => {}} />
          ))
        : data?.getCitiesByCountry?.cities.map((item, index) => (
            <ListItem key={index} item={item} onClick={onCityClick} />
          ))
        }
      </div>
    </div>
  );
};

export default CitiesTiles;
