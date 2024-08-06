import axios from 'axios';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import API_BASE_URL from '../config/apiConfig';
import { roomData } from '../room/roomSlice';

type Payment = {
  auth_id: string | null;
  authorization: string | null;
  bank_reference: string | null;
  cf_payment_id: string | null;
  entity: string | null;
  error_details: string | null;
  is_captured: boolean;
  order_amount: number | null;
  order_id: string;
  payment_amount: number | null;
  payment_completion_time: Date | null;
  payment_currency: string | null;
  payment_gateway_details: {
    gateway_name: string | null;
    gateway_order_id: string | null;
    gateway_payment_id: string | null;
    gateway_status_code: string;
    gateway_settlement: string;
  };
  payment_group: string | null;
  payment_message: string | null;
  payment_method: {
    netbanking: {
      netbanking_bank_code: number | null;
      netbanking_bank_name: string | null;
      netbanking_ifsc: string;
      netbanking_account_number: string;
    };
  };
  payment_offers: any[];
  payment_status: string | null;
  payment_time: Date | null;
  userId: string;
};
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
type Amenities = {
  wifi: boolean;
  airCondition: boolean;
  heater: boolean;
  washer: boolean;
  dryer: boolean;
  kitchen: boolean;
  parking: boolean;
  gym: boolean;
  pool: boolean;
};

type Location = {
  lat: number;
  lon: number;
};
type Room = {
  _id: string;
  userId: string;
  roomName: string;
  details: string[];
  availability: number;
  roomType: string;
  floor: number;
  rent: number;
  location: Location;
  amenities: Amenities;
  gender: string;
  whatsappLink: string;
  telegramLink: string;
  images: string[];
};

type DataType = {
  screen: {
    isBusy: boolean;
    error: string;
    success: string;
  };
  payments: Payment[];
  orders: Order[];
  room: Room | null;
};

const initialState: DataType = {
  screen: {
    isBusy: false,
    error: '',
    success: ''
  },
  payments: [],
  orders: [],
  room: null,
};

const slice = createSlice({
  name: 'app',
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
    setPayments: (state, action: PayloadAction<Payment[]>) => {
      state.payments = action.payload;
    },
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
    },
    setRoomData: (state, action: PayloadAction<Room>) => {
      state.room = action.payload;
    },
  },
});

export const { setBusy, setError, setSuccess, setPayments, setOrders, setRoomData } = slice.actions;

export const getPaymentsByStatus = (status: string) => async (dispatch) => {
  try {
    dispatch(setBusy(true));
    dispatch(setError(''));
    dispatch(setSuccess(''));

    const response = await axios.get(`${API_BASE_URL}/payment/getBystatus`, { params: { status } });
    if (response.data) {
        // console.log(response.data);
      const payments = response.data.data;
      dispatch(setPayments(payments));
      dispatch(setSuccess('Payments fetched successfully!'));

      for (const payment of payments) {
        dispatch(getOrdersByOrderId(payment.order_id));
      }
    } else {
      throw new Error('No payments found');
    }
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setBusy(false));
  }
};

export const getOrdersByOrderId = (orderId: string) => async (dispatch) => {
  try {
    dispatch(setBusy(true));
    dispatch(setError(''));
    dispatch(setSuccess(''));

    const response = await axios.get(`${API_BASE_URL}/order/fetch-order`, { params: { order_id: orderId } });
    if (response.data) {
        //  console.log(response.data.data);
      const roomId = response.data.data.room_id;
    //    console.log('roomid:',roomId);
    dispatch(fetchRoomById(roomId));
      dispatch(setOrders([response.data.data]));
      dispatch(setSuccess('Order fetched successfully!'));
    } else {
      throw new Error('No orders found');
    }
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setBusy(false));
  }
};

export const fetchRoomById = (roomId: string) => async (dispatch) => {
  try {
    dispatch(setBusy(true));
    dispatch(setError(''));
    dispatch(setSuccess(''));

    const response = await axios.get(`${API_BASE_URL}/room/getById`, { params: { room_id: roomId } });
   
    if (response.status === 200) {  
      dispatch(setRoomData(response.data.data));
      dispatch(setSuccess('Room fetched successfully.'));
    } else {
      dispatch(setError('Failed to fetch room details.'));
    }
  } catch (error) {
    console.log(error);
    dispatch(setError(error.message));
  } finally {
    dispatch(setBusy(false));
  }
};

export default slice.reducer;
