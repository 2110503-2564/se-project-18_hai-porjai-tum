"use client"
import LocationDateReserve from "@/components/LocationDateReserve"
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { addRental, removeRental } from "../../redux/features/rentSlice";
import { useSearchParams } from "next/navigation";

export default function Rental() {
    const [pickupDate, setPickupDate] = useState<Dayjs | null>(null);
    const [returnDate, setReturnDate] = useState<Dayjs | null>(null);
    const [pickupLocation, setPickupLocation] = useState<string>("BKK");
    const [returnLocation, setReturnLocation] = useState<string>("BKK");
    const [cid, setCid] = useState<string>("");
    const [car, setCar] = useState<string>("");
    const [model, setModel] = useState<string>("");
    const [nameLastname, setNameLastname] = useState<string>("");
    const [tel, setTel] = useState<string>("");

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNameLastname(event.target.value);
    }
    const handleTelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTel(event.target.value);
    }

    const dispatch = useDispatch<AppDispatch>();
    const urlParams = useSearchParams();

    // Pre-fill from URL if available
    const urlModel = urlParams.get("model");
    const urlTel = urlParams.get("tel");
    const urlCar = urlParams.get("car");
    const urlCid = urlParams.get("id")

    // Set pre-filled values if they exist
    useEffect(() => {
        if (urlModel) setModel(urlModel);
        if (urlTel) setTel(urlTel);
        if (urlCar) setCar(urlCar);
        if(urlCid) setCid(urlCid);
    }, [urlModel, urlTel, urlCar, urlCid]);
    const rentItems = useSelector((state: any) => state.rentSlice.rentItems);

    // const makeRental = () => {
    //     if (car && rentDate) {
    //         const fullCarName = carMap[car] || car;
    //         const formattedDate = dayjs(rentDate).format("YYYY/MM/DD");

    //         const item: RentalItem = {
    //             nameLastname,
    //             tel,
    //             car: fullCarName,
    //             rentDate: formattedDate,
    //         };
    //         dispatch(addRental(item));
    //         alert("Rental successful!");
    //     } else {
    //         alert("Please fill in all fields before rental.");
    //     }
    // };

    const makeRental = () => {
        if(cid && model && pickupDate && returnDate) {
            if(pickupDate < dayjs(new Date())){
                alert("You can not fill pickup date before this day")
                return
            }
            if(returnDate < pickupDate){
                alert("You can not fill return date before pickup date")
                return
            }
            const item:RentalItem = {
                carId: cid,
                carModel: model,
                numOfDays: returnDate.diff(pickupDate, "day"),
                pickupDate: dayjs(pickupDate.add(7, 'hour')).format("YYYY/MM/DD"),
                pickupLocation: pickupLocation,
                returnDate: dayjs(returnDate.add(7, 'hour')).format("YYYY/MM/DD"),
                returnLocation: returnLocation
            }
            dispatch(addRental(item))
        }else alert("please fill the form correctly")
    }


    return (
        <main className="w-[100%] flex flex-col items-center space-y-4">
            <div className="text-xl font-medium">New Rental For {model}</div>
            <div className="w-fit space-y-2">
                {/* <div className="text-md text-left text-gray-600">
                    Personal Information
                </div>
                <div className="bg-slate-100 rounded-lg space-y-4 w-full px-10 py-5 flex flex-col justify-center">
                    <TextField
                        className="w-full"
                        variant="standard"
                        label="Name-Lastname"
                        value={nameLastname}
                        onChange={handleNameChange}
                    />
                    <TextField
                        className="w-full"
                        variant="standard"
                        label="Contact-Number"
                        value={tel}
                        onChange={handleTelChange}
                    />
                </div> */}

                <div className="text-md text-left text-gray-600">Pick Up</div>
                <LocationDateReserve
                    onDateChange={(value: Dayjs) => setPickupDate(value)}
                    onLocationChange={(value: string) => setPickupLocation(value)}
                />
                <div className="text-md text-left text-gray-600">Return</div>
                <LocationDateReserve
                    onDateChange={(value: Dayjs) => setReturnDate(value)}
                    onLocationChange={(value: string) => setReturnLocation(value)}
                />
            </div>

            <button
                className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 shadow-sm text-white"
                onClick={makeRental}
            >
                Rent Car
            </button>
        </main>
    )
}
