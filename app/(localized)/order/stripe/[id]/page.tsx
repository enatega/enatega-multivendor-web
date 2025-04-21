"use client"
import React from 'react'
import { useParams } from 'next/navigation'
import StripeOrderScreen from '@/lib/ui/screens/protected/order/stripe'
export default function StripeOrderPage() {

    return <StripeOrderScreen/>;
}