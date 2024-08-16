import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [], 
    totalAmount: 0,
};

const cartSlice = createSlice({
    
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const { id, price, quantity } = action.payload;
            const existItem = state.items.find(sp => sp.id === id);
            if(existItem){
                state.totalAmount -= existItem.price * existItem.quantity; 
                existItem.quantity += quantity;
                state.totalAmount += existItem.price * existItem.quantity;
            } else {
                state.items.push(action.payload);
                state.totalAmount += price * quantity;
            }

            // state.items.push(action.payload);
            // state.totalAmount += action.payload.price;
        },
    },
});

export const { addToCart } = cartSlice.actions;
// lấy số lượng items trong giỏ hàng
export const selectCartItemsCount = (state) => state.cart.items.length;
export default cartSlice.reducer;

