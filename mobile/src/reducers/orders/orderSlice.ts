import axios from 'axios';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import API_BASE_URL from '../config/apiConfig';
import { AppThunk } from '../store';
type OrderState = {
    screen: {
      isBusy: boolean;
      error: string;
      success: string;
    };
    data: {
      orders: any[];
    };
  };
  
  const initialState: OrderState = {
    screen: {
      isBusy: false,
      error: '',
      success: '',
    },
    data: {
     orders: [],
    },
  };
  export const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
      setBusy: (state, action: PayloadAction<boolean>) => {
        state.screen.isBusy = action.payload;
      },
      setError: (state, action: PayloadAction<string>) => {
        state.screen.error = action.payload;
      },
      setSuccess: (state, action: PayloadAction<string>) => {
        state.screen.success = action.payload;
      },
     
      setOrders: (state, action: PayloadAction<any>) => {
        state.data.orders = action.payload;
      },

    },
  });

const { setBusy, setError, setSuccess, setOrders } = orderSlice.actions;

  export const createOrders = (orderData: any): AppThunk => async dispatch => {
    try {
      dispatch(setBusy(true));
      dispatch(setError(''));
      dispatch(setSuccess(''));
  
      const response = await axios.post(`${API_BASE_URL}/order/create-order`, orderData);
        
      if (response.data) {
        dispatch(setOrders(response.data));
        dispatch(setSuccess('Order created successfully!'));
      } else {
        throw new Error('Order creation failed');
      }
    } catch (error: any) {
        console.log(error)
      dispatch(setError(error.message));
    } finally {
      dispatch(setBusy(false));
    }
  };
  export default orderSlice.reducer;