import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import cartItems from "../../cartItems"
const url = 'https://course-api.com/react-useReducer-cart-project';

const initialState = {
    cartItems: [],
    amount: cartItems.length,
    total: 0,
    isLoading: true
}

export const getCartItems = createAsyncThunk("cart/getCartItems", async (value,thunkAPI) => {
    // try {
    //     console.log(thunkAPI.getState());
    // } catch (err) {
    //     console.log(err);
    // }

    return fetch(url).then(res => res.json()).catch(err => console.log(err))
})


const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cartItems = [];
            state.amount = 0
        },
        removeItem: (state, action) => {
            const itemId = action.payload
            state.cartItems = state.cartItems.filter(item => item.id !== itemId)
            state.amount = state.amount - 1
        },
        increase: (state, { payload }) => {
            const cardItem = state.cartItems.find(item => item.id === payload.id)
            cardItem.amount += 1
        },
        decrease: (state, { payload }) => {
            const cardItem = state.cartItems.find(item => item.id === payload.id)
            cardItem.amount -= 1

        },
        calculateTotals: (state) => {
            let amount = 0;
            let total = 0;
            state.cartItems.forEach((item) => {
                amount += item.amount;
                total += item.amount * item.price;
            });
            state.amount = amount;
            state.total = total;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCartItems.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCartItems.fulfilled, (state, action) => {
                // console.log(action);
                state.isLoading = false;
                state.cartItems = action.payload;
            })
            .addCase(getCartItems.rejected, (state, action) => {
                console.log(action);
                state.isLoading = false;
            });
    },
})

// console.log(cartSlice);

export const { clearCart, removeItem, increase, decrease, calculateTotals } = cartSlice.actions
export default cartSlice.reducer