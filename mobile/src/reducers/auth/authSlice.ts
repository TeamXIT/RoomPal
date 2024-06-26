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
    resetToken: string;
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
    resetToken: '',
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
    setResetToken: (state, action: PayloadAction<string>) => {
      state.data.resetToken = action.payload;
    },
  },
});

export const { setBusy, setError, setSuccess, setAuthToken, setMobileNumber, setResetToken } = authSlice.actions;

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
    console.log(error);
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
      confirmPassword
    });
    console.log(response);
    dispatch(setSuccess('User registered successfully.'));
    dispatch(signIn(mobileNumber, password)); // Automatically sign in the user after registration
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error.message || 'Registration failed'));
    console.log(error)
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
      dispatch(setResetToken(response.data.resetToken));
      dispatch(setMobileNumber(mobileNumber));
      dispatch(setSuccess('Reset token sent to mobile number.'));
      return true; // Indicate success
    } else {
      dispatch(setError('Failed to send reset token'));
      return false; // Indicate failure
    }
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error.message || 'Failed to send reset token'));
    return false; // Indicate failure
  } finally {
    dispatch(setBusy(false));
  }
};

export const resetPassword = (newPassword: string, confirmPassword: string): AppThunk => async (dispatch, getState) => {
  const { mobileNumber, resetToken } = getState().auth.data;
  dispatch(setBusy(true));
  dispatch(setError(''));
  dispatch(setSuccess(''));
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/resetPassword`, { mobileNumber, newPassword, confirmPassword, resetToken });
    dispatch(setSuccess('Password reset successfully.'));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error.message || 'Failed to reset password'));
    console.log(error);
  } finally {
    dispatch(setBusy(false));
  }
};

export default authSlice.reducer;
