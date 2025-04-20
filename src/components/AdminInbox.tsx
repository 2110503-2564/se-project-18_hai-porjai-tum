import Image from "next/image";

type Props = {
  rentals: { id: string; carImage: string; rentalId: string }[];
  selectedRentalId: string | null;
  onSelect: (rental: any) => void;
};

export default function AdminInbox({ rentals, onSelect, selectedRentalId }: Props) {
  return (
    <div className="flex gap-6 overflow-x-auto px-2 py-2">
      {rentals.map((rental) => (
        <div
          key={rental.id}
          className="flex flex-col items-center cursor-pointer hover:opacity-90"
          onClick={() => onSelect(rental)}
        >
          <div className={`w-16 h-16 rounded-full border-2 p-1 
              ${selectedRentalId === rental.id ? "border-red-500" : "border-gray-300"}`}>
            <Image
              src={rental.carImage || "/img/default-car.jpg"} // Use the car image
              alt={rental.rentalId}
              width={64}
              height={64}
              className="rounded-full object-cover w-full h-full"
            />
          </div>
          <span className="text-xs mt-1 text-center truncate w-16">{rental.rentalId}</span> {/* Show rental ID */}
        </div>
      ))}
    </div>
  );
}
