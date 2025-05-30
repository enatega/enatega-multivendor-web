"use client";
import { useConfig } from '@/lib/context/configuration/configuration.context';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const StoreScreen = dynamic(
  () => import('@/lib/ui/screens/protected/home').then(mod => mod.StoreScreen),
  { ssr: false }
);

export default function StorePage() {
  const router = useRouter()
  const {isMultiVendor} = useConfig()
  useEffect(() => {
    if(!isMultiVendor){
      router.push("/")
    }
  }, [isMultiVendor, router])
  return <StoreScreen/>;
}
