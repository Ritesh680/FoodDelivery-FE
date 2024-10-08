import { createSlice } from "@reduxjs/toolkit";
import { ImageGetResponse } from "../@types/interface";

interface CartItem {
	cart: CartPayload[];
}

interface CartPayload {
	productId: string;
	quantity: number;
	price: number;
	name: string;
	discountedPrice: number;
	image?: ImageGetResponse[];
}
interface DeleteCartPayload {
	productId: string;
}
export const cartSlice = createSlice({
	name: "cart",
	initialState: {
		cart: [],
	} as CartItem,
	reducers: {
		updateCart: (state, action: { payload: CartPayload }) => {
			const alreadyExist = state.cart.find(
				(item) => item.productId === action.payload.productId
			);
			if (alreadyExist) {
				state.cart = state.cart.map((item) =>
					item.productId === action.payload.productId
						? { ...item, quantity: action.payload.quantity } // Fix: Return a new object with updated quantity
						: item
				);
			} else {
				state.cart.push(action.payload);
			}
		},
		removeFromCart: (state, action: { payload: DeleteCartPayload }) => {
			state.cart = state.cart.filter(
				(item) => item.productId !== action.payload.productId
			);
		},
		clearCart: (state) => {
			state.cart = [];
		},
	},
});

export const { updateCart, removeFromCart, clearCart } = cartSlice.actions;
