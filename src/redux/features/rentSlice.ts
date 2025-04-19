import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type RentState = {
    rentItems: RentalItem[];
};

const initialState: RentState = { rentItems: [] };

export const rentSlice = createSlice({
    name: "rent",
    initialState,
    reducers: {
        addRental: (state, action: PayloadAction<RentalItem>) => {
            const newRental = action.payload;
            const existingIndex = state.rentItems.findIndex(
                (item) =>
                    item.carModel === newRental.carModel &&
                    item.pickupDate === newRental.pickupDate &&
                    item.returnDate === newRental.returnDate
            );
            if (existingIndex !== -1) {
                state.rentItems[existingIndex] = newRental;
            } else {
                state.rentItems.push(newRental);
            }
        },
        removeRental: (state, action: PayloadAction<RentalItem>) => {
            const index = state.rentItems.findIndex(obj =>
                // obj.nameLastname === action.payload.nameLastname &&
                // obj.tel === action.payload.tel &&
                obj.carModel === action.payload.carModel &&
                obj.pickupDate === action.payload.pickupDate &&
                obj.returnDate === action.payload.returnDate
            );

            if (index !== -1) {
                state.rentItems.splice(index, 1); // Remove only the first found match
            }
        }
    }
});

export const { addRental, removeRental } = rentSlice.actions;
export default rentSlice.reducer;
