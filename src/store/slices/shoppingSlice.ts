import { createSlice } from '@reduxjs/toolkit';
import { IOrder, IProduct } from '@/interfaces/product';
import { IUser } from '@/interfaces/user';

export interface IInitialState {
    product: IProduct | null;
    cartItems: IProduct[];
    user: IUser | null;
    orders: IOrder | null;
}

const initialState: IInitialState = {
    product: null,
    cartItems: [],
    user: null,
    orders: null,
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
        addUser: (state, action) => {
            state.user = action.payload;
        },
        deleteUser: (state) => {
            state.user = null;
        },
        saveOrder: (state, action) => {
            state.orders = action.payload;
        },
        resetOrder: (state, action) => {
            state.orders = null;
        },
    },
});

export const {
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeProductFromCart,
    resetCart,
    addUser,
    deleteUser,
    saveOrder,
    resetOrder,
} = shoppingSlice.actions;

export default shoppingSlice.reducer;
