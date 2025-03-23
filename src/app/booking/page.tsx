"use client"
import DateReserve from "@/components/DateReserve"
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { addBooking, removeBooking } from "../../redux/features/bookSlice";
import { useSearchParams } from "next/navigation";

export default function Rental() {
    const [bookDate, setBookDate] = useState<Dayjs | null>(null);
    const [venue, setVenue] = useState<string>("Bloom");
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
    const urlName = urlParams.get("model");
    const urlTel = urlParams.get("tel");
    const urlVenue = urlParams.get("venue");

    // Set pre-filled values if they exist
    useEffect(() => {
        if (urlName) setNameLastname(urlName);
        if (urlTel) setTel(urlTel);
        if (urlVenue) setVenue(urlVenue);
    }, [urlName, urlTel, urlVenue]);
    const bookItems = useSelector((state: any) => state.bookSlice.bookItems);

    const venueMap: Record<string, string> = {
        Bloom: "The Bloom Pavilion",
        Spark: "Spark Space",
        GrandTable: "The Grand Table"
    };

    const makeBooking = () => {
        if (venue && bookDate) {
            const fullVenueName = venueMap[venue] || venue;
            const formattedDate = dayjs(bookDate).format("YYYY/MM/DD");

            const item: BookingItem = {
                nameLastname,
                tel,
                venue: fullVenueName,
                bookDate: formattedDate,
            };
            dispatch(addBooking(item));
            alert("Booking successful!");
        } else {
            alert("Please fill in all fields before booking.");
        }
    };


    return (
        <main className="w-[100%] flex flex-col items-center space-y-4">
            <div className="text-xl font-medium">New Rental</div>
            <div className="w-fit space-y-2">
                <div className="text-md text-left text-gray-600">
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
                </div>

                <div className="text-md text-left text-gray-600">Booking Date</div>
                <DateReserve
                    onDateChange={(value: Dayjs) => setBookDate(value)}
                    onLocationChange={(value: string) => setVenue(value)}
                />
            </div>

            <button
                className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 shadow-sm text-white"
                onClick={makeBooking}
            >
                Book Venue
            </button>
        </main>
    )
}
