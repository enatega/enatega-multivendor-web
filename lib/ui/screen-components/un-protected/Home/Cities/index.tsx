"use client"

import React,{useState} from 'react'
import { useQuery,gql } from '@apollo/client'
import { GET_COUNTRIES } from '@/lib/api/graphql/queries/Countries'
import ListItem from '@/lib/ui/useable-components/list-item';
import CitiesTiles from './CitilesTiles/CitiesTiles';

const COUNTRIES = gql`
  ${GET_COUNTRIES}
`;

const Cities = () => {
  const [toggle,setToggle]=useState(false)
  const [countryId,setCountryId]=useState("")
  const { data, loading } = useQuery(COUNTRIES, {
    fetchPolicy: "cache-and-network",
  });
const onCountryClick =(item)=>
  {
   setToggle(true)
   setCountryId(item._id)
  }

  const AllCountrybuttonClick =()=>
  {
    setToggle(false)
  }

  console.log(data)
  return (
    <div className='p-8'>
    
    {toggle == false ?(
      <>
      <div className='text-[#111827] text-xl font-semibold '>Explore Countries</div>
      <div className='flex flex-wrap gap-6 items-center justify-center my-[30px]'>
      {loading
          ? [...Array(8)].map((_, index) => <ListItem key={index} loading={true} />)
          : data?.getCountries?.map((item, index) => (
              <ListItem key={index} item={item} onClick={onCountryClick} />
            ))}
            </div>
            </> )
            
 :    <div className=' bg-green'>
       <CitiesTiles countryId={countryId} AllCountries={AllCountrybuttonClick} />
      </div>
    }
      
    </div>
  )
}

export default Cities
