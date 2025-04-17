"use client"
import { useContext } from 'react'
import UserContext from '@/lib/context/User/User.context';

function useTracking({ orderId }: { orderId: string }) {
    const { orders } = useContext(UserContext);

    const order = orders?.find((order) => order._id === orderId);



    return {
        order
    }
}

export default useTracking