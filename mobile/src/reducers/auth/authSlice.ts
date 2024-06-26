import axios from 'axios';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import API_BASE_URL from '../config/apiConfig';
import { AppThunk } from '../store';

type AuthState = {
  screen: {
    isBusy: boolean;
    error: string;
    success: string;
  };
  data: {
    mobileNumber: string;
    authToken: string;
    otp: string | null; // Store OTP in Redux state
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

export const { setBusy, setError, setSuccess, setAuthToken, setMobileNumber, setOTP, clearOTP } = authSlice.actions;

export const signIn = (mobileNumber: string, password: string): AppThunk => async (dispatch) => {
  dispatch(setBusy(true));
  dispatch(setError(''));
  dispatch(setSuccess(''));
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signIn`, { mobileNumber, password });
    dispatch(setAuthToken(response.data.token));
    dispatch(setMobileNumber(mobileNumber));
    dispatch(setSuccess('User logged in successfully.'));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error.message || 'Sign in failed'));
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
  preferences: {
    clean: boolean;
    pets: boolean;
    smoking: boolean;
    drinking: boolean;
  },
  makeMobilePrivate: boolean,
  password: string,
  confirmPassword: string
): AppThunk => async (dispatch) => {
  dispatch(setBusy(true));
  dispatch(setError(''));
  dispatch(setSuccess(''));
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, {
      fullName,
      email,
      mobileNumber,
      dateOfBirth,
      gender,
      lookingForRoom,
      lookingForRoommate,
      preferences,
      makeMobilePrivate,
      password,
      confirmPassword,
    });
    dispatch(setSuccess('User registered successfully.'));
    dispatch(signIn(mobileNumber, password));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error.message || 'Registration failed'));
  } finally {
    dispatch(setBusy(false));
  }
};

export const forgotPassword = (mobileNumber: string): AppThunk => async (dispatch) => {
  dispatch(setBusy(true));
  dispatch(setError(''));
  dispatch(setSuccess(''));
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/forgotPassword`, { mobileNumber });
    if (response.status === 200) {
      dispatch(setMobileNumber(mobileNumber));
      dispatch(setSuccess('OTP sent to mobile number.'));
    } else {
      dispatch(setError('Failed to send OTP'));
    }
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error.message || 'Failed to send OTP'));
  } finally {
    dispatch(setBusy(false));
  }
};

export const verifyOTP = (mobileNumber: string, otp: string): AppThunk => async (dispatch) => {
  dispatch(setBusy(true));
  dispatch(setError(''));
  dispatch(setSuccess(''));
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/verifyOTP`, { mobileNumber, otp });
    if (response.status === 200) {
      dispatch(setOTP(otp)); // Store OTP in Redux state
      dispatch(setSuccess('OTP verified successfully.'));
    } else {
      dispatch(setError('Invalid OTP'));
    }
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error.message || 'Failed to verify OTP'));
  } finally {
    dispatch(setBusy(false));
  }
};

export const resetPassword = (newPassword: string, confirmPassword: string): AppThunk => async (dispatch, getState) => {
  const { mobileNumber, otp } = getState().auth.data;
  dispatch(setBusy(true));
  dispatch(setError(''));
  dispatch(setSuccess(''));
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/resetPassword`, { mobileNumber, newPassword, otp });
    dispatch(clearOTP()); // Clear OTP from Redux state after successful password reset
    dispatch(setSuccess('Password reset successfully.'));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error.message || 'Failed to reset password'));
  } finally {
    dispatch(setBusy(false));
  }
};

export default authSlice.reducer;
