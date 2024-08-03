import axios from 'axios';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import API_BASE_URL from '../config/apiConfig';
import { AppThunk } from '../store';

// Define the order type
type Order = {
  order_id: string;
  order_amount: number;
  order_currency: string;
  customer_details: {
    customer_id: string;
    customer_email: string;
    customer_phone: string;
  };
  order_meta: {
    return_url: string;
  };
  room_id: string;
};

type OrderState = {
  screen: {
    isBusy: boolean;
    error: string;
    success: string;
  },
  orders: Order[];
};

const initialState: OrderState = {
  screen: {
    isBusy: false,
    error: '',
    success: '',
  },
  orders: [],
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
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
      // console.log(state.orders);
    },
  },
});

const { setBusy, setError, setSuccess, setOrders } = orderSlice.actions;

export const createOrders = (orderData: Order): AppThunk => async dispatch => {
  try {
    console.log(orderData)
    dispatch(setBusy(true));
    dispatch(setError(''));
    dispatch(setSuccess(''));

    const response = await axios.post(`${API_BASE_URL}/order/create-order`, orderData);
    console.log(response.data);
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

export const getOrdersByCustomerId = (customerId: string): AppThunk => async dispatch => {
  try {
    console.log('getOrdersByCustomerId', customerId);
    dispatch(setBusy(true));
    dispatch(setError(''));
    dispatch(setSuccess(''));
    const response = await axios.get(`${API_BASE_URL}/order/getUsersOrders`, { params: { customer_id: customerId } });
    //  console.log(response.data.data);
    if (response.data) {
      dispatch(setOrders(response.data.data));
      dispatch(setSuccess('Orders fetched successfully!'));
    } else {
      throw new Error('No orders found');
    }
  } catch (error: any) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setBusy(false));
  }
};

export const { actions, reducer } = orderSlice;
export default reducer;
