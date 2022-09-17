import { createSlice } from '@reduxjs/toolkit'

const initialState = [];

export const basket = createSlice({
    name: 'basket',
    initialState,

    reducers: {
        addToCart(state, { payload }) {
            console.log(state)
            const { id } = payload;
            const find = state.find((item) => item.id === id)
            if (find) {

                return state.map((item) =>
                    item.id === id
                        ?
                        {
                            ...item,
                            quantity: item.quantity + 1
                        }
                        : item
                );
            } else {
                state.push({
                    ...payload,
                    quantity: 1
                })
            }
        },
        increment(state, { payload }) {
            return state.map((item) =>
                item.id === payload
                    ? {
                        ...item,
                        quantity: item.quantity + 1,
                    }
                    : item
            );
        },
        decrement(state, { payload }) {
            return state.map((item) =>
                item.id === payload
                    ? {
                        ...item,
                        quantity: item.quantity - 1,
                    }
                    : item
            );
        },
        removeItem: (state, action) => {
            const itemId = action.payload;
            return state.filter((item) => item.id !== itemId);
        },
        clear(state) {
            return [];
        },
    },
});


export const { addToCart, increment, decrement, removeItem, clear } = basket.actions

export default basket.reducer