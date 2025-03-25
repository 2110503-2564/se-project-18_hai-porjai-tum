"use client"
import getRental from "@/libs/getRental"
import dayjs, { Dayjs } from "dayjs"
import LocationDateReserve from "./LocationDateReserve"
import { useState } from "react";

export default async function ManagePanel ({pickupDateCB, pickuoLocationCB, returnDateCB, returnLocationCB}:
     {pickupDateCB:Function, pickuoLocationCB:Function, returnDateCB:Function, returnLocationCB:Function}) {
    
    const [pickupDate, setPickupDate] = useState<Dayjs | null>(null);
    const [returnDate, setReturnDate] = useState<Dayjs | null>(null);
    const [pickupLocation, setPickupLocation] = useState<string>("BKK");
    const [returnLocation, setReturnLocation] = useState<string>("BKK");

    return (
        <div>
            <div className="text-md text-left text-gray-600">Pick Up</div>
            <LocationDateReserve
                onDateChange={(value: Dayjs) => {setPickupDate(value); pickupDateCB(value)}}
                onLocationChange={(value: string) => {setPickupLocation(value); pickuoLocationCB(value)}}
            />
            <div className="text-md text-left text-gray-600">Return</div>
            <LocationDateReserve
                onDateChange={(value: Dayjs) => {setReturnDate(value); returnDateCB(value)}}
                onLocationChange={(value: string) => {setReturnLocation(value); returnLocationCB(value)}}
            />
        </div>
    )
}