import RentalMenu from "@/components/RentalMenu";
import getCars from "@/libs/getCars";

export default function ManageBookingLayout(
    { children }:
        { children: React.ReactNode }
) {
    const carsPromise = getCars()
    return (
        <div className="flex flex-row pt-3">
            {/* <RentalMenu carsJson={carsPromise}/> */}
            <div className="flex flex-col w-full">
                {children}
            </div>
        </div>
    )
}