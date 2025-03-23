import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type BookState = {
    bookItems: BookingItem[];
};

const initialState: BookState = { bookItems: [] };

export const bookSlice = createSlice({
    name: "book",
    initialState,
    reducers: {
        addBooking: (state, action: PayloadAction<BookingItem>) => {
            const newBooking = action.payload;
            const existingIndex = state.bookItems.findIndex(
                (item) =>
                    item.venue === newBooking.venue &&
                    item.bookDate === newBooking.bookDate
            );
            if (existingIndex !== -1) {
                state.bookItems[existingIndex] = newBooking;
            } else {
                state.bookItems.push(newBooking);
            }
        },
        removeBooking: (state, action: PayloadAction<BookingItem>) => {
            const index = state.bookItems.findIndex(obj =>
                obj.nameLastname === action.payload.nameLastname &&
                obj.tel === action.payload.tel &&
                obj.venue === action.payload.venue &&
                obj.bookDate === action.payload.bookDate
            );

            if (index !== -1) {
                state.bookItems.splice(index, 1); // Remove only the first found match
            }
        }
    }
});

export const { addBooking, removeBooking } = bookSlice.actions;
export default bookSlice.reducer;
