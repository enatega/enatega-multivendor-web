"use client";
import { useConfig } from '@/lib/context/configuration/configuration.context';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const RestaurantsScreen = dynamic(
  () => import('@/lib/ui/screens/protected/home').then(mod => mod.RestaurantsScreen),
  { ssr: false }
);

export default function RestaurantPage() {
  const router = useRouter()
  const {isMultiVendor} = useConfig()
  useEffect(() => {
    if(!isMultiVendor){
      router.push("/")
    }
  }, [isMultiVendor, router])
  return <RestaurantsScreen />;
}
