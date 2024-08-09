import axios from 'axios';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store';
import { API_BASE_URL } from '../config/appConfig';

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
  userId: string | null;
};

type PaymentState = {
  screen: {
    isBusy: boolean;
    error: string;
    success: string;
  },
  payments: Payment[];
};

const initialState: PaymentState = {
  screen: {
    isBusy: false,
    error: '',
    success: '',
  },
  payments: [],
};

export const paymentSlice = createSlice({
  name: 'payments',
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
  },
});

const { setBusy, setError, setSuccess, setPayments } = paymentSlice.actions;

export const createPayment = (paymentData: Payment): AppThunk => async dispatch => {
  try {
    const paymentDetails = {paymentDetails:paymentData}
    dispatch(setBusy(true));
    dispatch(setError(''));
    dispatch(setSuccess(''));

    const response = await axios.post(`${API_BASE_URL}/payment/create-payment`, paymentDetails);
    if (response.data) {
      dispatch(setPayments(response.data));
      dispatch(setSuccess('Payment created successfully!'));
    } else {
      throw new Error('Payment creation failed');
    }
  } catch (error: any) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setBusy(false));
  }
};

export const getPaymentsByOrderId = (orderId: string): AppThunk => async dispatch => {
  try {
    dispatch(setBusy(true));
    dispatch(setError(''));
    dispatch(setSuccess(''));

    const response = await axios.get(`${API_BASE_URL}/payment/getPaymentsByOrderId`, { params: { order_id: orderId } });
    if (response.data) {
      dispatch(setPayments(response.data.data));
      dispatch(setSuccess('Payments fetched successfully!'));
    } else {
      throw new Error('No payments found');
    }
  } catch (error: any) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setBusy(false));
  }
};

export const { actions, reducer } = paymentSlice;
export default reducer;
