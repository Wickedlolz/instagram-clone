import { createSlice } from '@reduxjs/toolkit';
import { IProduct } from '@/interfaces/product';

interface IInitialState {
    products: IProduct[];
    product: IProduct | null;
    cartItems: IProduct[];
}

const initialState: IInitialState = {
    products: [],
    product: null,
    cartItems: [],
};

export const shoppingSlice = createSlice({
    name: 'shopping',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingProduct = state.cartItems.find(
                (product) => product._id === action.payload._id
            );

            if (existingProduct) {
                existingProduct.quantity += action.payload.quantity;
            } else {
                state.cartItems.push(action.payload);
            }
        },
        increaseQuantity: (state, action) => {
            const existingProduct = state.cartItems.find(
                (product) => product._id === action.payload._id
            );

            if (existingProduct) {
                existingProduct.quantity++;
            }
        },
        decreaseQuantity: (state, action) => {
            const existingProduct = state.cartItems.find(
                (product) => product._id === action.payload._id
            );

            if (existingProduct && existingProduct.quantity > 1) {
                existingProduct.quantity--;
            }
        },
        removeProductFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(
                (product) => product._id !== action.payload._id
            );
        },
        resetCart: (state) => {
            state.cartItems = [];
        },
    },
});

export const {
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeProductFromCart,
    resetCart,
} = shoppingSlice.actions;

export default shoppingSlice.reducer;
