import React from 'react'

// Assets
import Image from "next/image";
import { IOrderTrackingDetail } from '@/lib/utils/interfaces/order-tracking-detail.interface';


function TrackingOrderDetails({ orderTrackingDetails }: { orderTrackingDetails: IOrderTrackingDetail }) {
    console.log("orderTrackingDetails", orderTrackingDetails);
    return (
        <div className="mt-8 space-y-6 flex-1 max-w-2xl md:w-auto w-full md:px-0 px-4">
            <div>
                <h3 className="text-lg font-semibold mb-2">Order Details</h3>
                <div className="flex items-center justify-between">
                    <div className="flex gap-4 items-center">
                        <Image
                            src="https://storage.googleapis.com/a1aa/image/jt1AynRJJVtM9j1LRb30CodA1xsK2R23pWTOmRv3nsM.jpg"
                            alt="Big Share"
                            width={80}
                            height={80}
                            className="rounded-lg"
                        />
                        <div>
                            <p className="font-medium text-gray-900">Big Share</p>
                            <p className="text-sm text-gray-500">Dip 1/2: Currydippi<br />Sweet and sour dip</p>
                        </div>
                    </div>
                    <span className="text-blue-600 font-semibold">$6</span>
                </div>
            </div>

            {/* Item Summary */}
            <div>
                <h3 className="text-lg font-semibold mb-2">Details (1 Items)</h3>
                <div className="text-sm text-gray-700 space-y-2">
                    <div className="flex justify-between">
                        <span>1x Big Share</span>
                        <span>$12.00</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>$12.00</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Discount</span>
                        <span>$0.00</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Delivery Charge</span>
                        <span>$5.00</span>
                    </div>
                </div>
            </div>

            {/* Payment Info */}
            <div className="border rounded-md p-4">
                <h4 className="font-semibold mb-2">Paid With</h4>
                <div className="flex items-center gap-2 text-sm">
                    <span>💳</span>
                    <span>Cash on Delivery</span>
                    <span className="ml-auto font-semibold">$17.00</span>
                </div>
            </div>

            {/* Cancel Button */}
            <div className="text-center">
                <button className="w-full border border-red-500 text-red-500 px-6 py-2 rounded-full hover:bg-red-50 transition">
                    Cancel Order
                </button>
            </div>
        </div>
    )
}

export default TrackingOrderDetails