import { createSlice } from "@reduxjs/toolkit"
import cartItems from "../../cartItems"
const initialState = {
    cartItems: cartItems,
    amount: cartItems.length,
    total: 0,
    isLoading: true
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cartItems = [];
            state.amount=0
        },
        removeItem: (state, action) => {
            const itemId = action.payload
            state.cartItems = state.cartItems.filter(item => item.id !== itemId)
            state.amount=state.amount-1
        },
        increase: (state, { payload }) => {
            const cardItem = state.cartItems.find(item => item.id === payload.id)
            cardItem.amount+=1
        }, 
        decrease: (state, { payload }) => {
            const cardItem = state.cartItems.find(item => item.id === payload.id)
            cardItem.amount-=1
            
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
})

// console.log(cartSlice);

export const {clearCart,removeItem,increase,decrease,calculateTotals} = cartSlice.actions
export default cartSlice.reducer