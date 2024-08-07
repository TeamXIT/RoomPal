import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducers/auth/authSlice';
import roomSlice from './room/roomSlice';
import profileSlice from './profile/profileSlice';
import  orderSlice  from './orders/orderSlice';
import  paymentSlice  from './payment/paymentslice';
import Slice from './payment/roomDataSlice'
import favoriteSlice from './favourites/favouritesSlice';


export const store = configureStore({
    reducer: {
        auth: authReducer,
        room:roomSlice,
        profile:profileSlice,
        orders:orderSlice,
        payment:paymentSlice,
        app:Slice,
        favorite:favoriteSlice
       
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {auth: AuthState, product: ProductState}
export type AppDispatch = typeof store.dispatch;
