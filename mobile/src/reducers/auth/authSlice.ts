import axios from 'axios';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../config/appConfig';

type AuthState = {
  screen: {
    isBusy: boolean;
    error: string;
    success: string;
  };
  data: {
    mobileNumber: string;
    authToken: string;
    otp: string | null;
  };
};

const initialState: AuthState = {
  screen: {
    isBusy: false,
    error: '',
    success: '',
  },
  data: {
    mobileNumber: '',
    authToken: '',
    otp: null,
  },
};

export const authSlice = createSlice({
  name: 'auth',
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
    setAuthToken: (state, action: PayloadAction<string>) => {
      state.data.authToken = action.payload;
    },
    setMobileNumber: (state, action: PayloadAction<string>) => {
      state.data.mobileNumber = action.payload;
    },
    setOTP: (state, action: PayloadAction<string>) => {
      state.data.otp = action.payload;
    },
    clearOTP: (state) => {
      state.data.otp = null;
    },
  },
});

export const {
  setBusy,
  setError,
  setSuccess,
  setAuthToken,
  setMobileNumber,
  setOTP,
  clearOTP
} = authSlice.actions;

const customConfig = {
  headers: { "Content-Type": "application/json" }
}

export const signIn = (mobileNumber: string, password: string): AppThunk => async (dispatch) => {
  try {
    dispatch(setBusy(true));
    dispatch(setError(''));
    dispatch(setSuccess(''));

    const response = await axios.post(`${API_BASE_URL}/auth/signIn`, { mobileNumber, password }, customConfig);
    if (response?.status == 200) {
      AsyncStorage.setItem('MobileNumber', mobileNumber);
      dispatch(setAuthToken(response.data.data));
      dispatch(setMobileNumber(mobileNumber));
      dispatch(setSuccess('User logged in successfully.'));
    }
  } catch (error) {

    dispatch(setError(error?.response?.data?.message || 'Sign in failed'));
  } finally {
    dispatch(setBusy(false));
  }
};

export const register = (
  fullName: string,
  email: string,
  mobileNumber: string,
  dateOfBirth: string,
  gender: string,
  lookingForRoom: boolean,
  lookingForRoommate: boolean,
  // preferences: {
  // clean: boolean;
  // pets: boolean;
  // smoking: boolean;
  // drinking: boolean;
  // },
  password: string,
  confirmPassword: string
): AppThunk => async (dispatch) => {
  try {
    dispatch(setBusy(true));
    dispatch(setError(''));
    dispatch(setSuccess(''));

    const response = await axios.post(`${API_BASE_URL}/auth/register`,
      {
        fullName, email, mobileNumber, dateOfBirth, gender, lookingForRoom, lookingForRoommate, password, confirmPassword
      }, customConfig);
    if (response?.status == 200) {
      await dispatch(setSuccess('User registered successfully.'));
      await dispatch(signIn(mobileNumber, password));
    }
  } catch (error) {
    dispatch(setError(error?.response?.data?.message || 'Registration failed'));
  } finally {
    dispatch(setBusy(false));
  }
};

export const forgotPassword = (mobileNumber: string): AppThunk => async (dispatch) => {
  try {
    dispatch(setBusy(true));
    dispatch(setError(''));
    dispatch(setSuccess(''));

    const response = await axios.post(`${API_BASE_URL}/auth/forgotPassword`, { mobileNumber }, customConfig);
    if (response.status === 200) {
      dispatch(setOTP(response.data.otp))
      dispatch(setMobileNumber(mobileNumber));
    } else {
      dispatch(setError('Failed to send OTP'));
    }
  } catch (error) {
    dispatch(setError(error?.response?.data?.error || error?.message || 'Failed to send OTP'));
  } finally {
    dispatch(setBusy(false));
  }
};

export const verifyOTP = (otp: string): AppThunk => async (dispatch, getState) => {
  const { mobileNumber } = getState().auth.data;
  try {
    dispatch(setBusy(true));
    dispatch(setError(''));
    dispatch(setSuccess(''));

    const response = await axios.post(`${API_BASE_URL}/auth/verifyOTP`, { mobileNumber, otp }, customConfig);
    if (response.status === 200) {
      dispatch(setOTP(otp));
      dispatch(setSuccess('OTP verified successfully.'));
    } else {
      dispatch(setError('Invalid OTP'));
    }
  } catch (error) {
    dispatch(setError(error?.response?.data?.message || error?.message || 'Failed to verify OTP'));
  } finally {
    dispatch(setBusy(false));
  }
};

export const resetPassword = (newPassword: string, confirmPassword: string): AppThunk => async (dispatch, getState) => {
  const { mobileNumber } = getState().auth.data;
  try {
    dispatch(setBusy(true));
    dispatch(setError(''));
    dispatch(setSuccess(''));

    const response = await axios.post(`${API_BASE_URL}/auth/resetPassword`, { mobileNumber, newPassword, confirmPassword }, customConfig);
    if (response.status === 200) {
      dispatch(clearOTP());
      dispatch(setSuccess('Password reset successfully.'));
    }
  } catch (error) {
    dispatch(setError(error?.response?.data?.message || error?.message || 'Failed to reset password'));
  } finally {
    dispatch(setBusy(false));
  }
};

export const resendOtp = (): AppThunk => async (dispatch, getState) => {
  const { mobileNumber } = getState().auth.data;
  dispatch(setBusy(true));
  dispatch(setError(''));
  dispatch(setSuccess(''));
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/forgotPassword`, { mobileNumber }, customConfig);
    if (response.status === 200) {
      dispatch(setMobileNumber(mobileNumber));
      dispatch(setOTP(response.data.otp))
    } else {
      dispatch(setError('Failed to send OTP'));
    }
  } catch (error) {
    dispatch(setError(error?.response?.data?.error || error?.message || 'Failed to send OTP'));
  } finally {
    dispatch(setBusy(false));
  }
};

export default authSlice.reducer;
