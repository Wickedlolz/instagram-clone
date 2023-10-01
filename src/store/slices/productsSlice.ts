import { createSlice } from '@reduxjs/toolkit';
import { IProduct } from '@/interfaces/product';

interface IInitialState {
    products: IProduct[];
    product: IProduct | null;
    cartItems: IProduct[] | null;
}

const initialState: IInitialState = {
    products: [],
    product: null,
    cartItems: null,
};

export const productsSlice = createSlice({
    name: 'shopping',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.cartItems = action.payload;
        },
    },
});

export const { addToCart } = productsSlice.actions;
export default productsSlice.reducer;
