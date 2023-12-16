import { createSlice } from '@reduxjs/toolkit';
const ORDER_INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
};



const orderSlice=createSlice({
   name:"payment",
   initialState: ORDER_INITIAL_STATE,
   reducer:{
    Pay(state,action){
     
    }
   }
})