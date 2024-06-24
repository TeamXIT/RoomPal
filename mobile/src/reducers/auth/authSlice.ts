import axios from 'axios';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import API_BASE_URL from '../config/apiConfig';
import { AppThunk } from '../store';

type AuthState = {
  screen: {
    isBusy: boolean;
    error: string;
  };
  data: {
    mobileNumber: string;
    authToken: string;
  };
};

const initialState: AuthState = {
  screen: {
    isBusy: false,
    error: '',
  },
  data: {
    mobileNumber: '',
    authToken: '',
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
    setAuthToken: (state, action: PayloadAction<string>) => {
      state.data.authToken = action.payload;
    },
    setMobileNumber: (state, action: PayloadAction<string>) => {
      state.data.mobileNumber = action.payload;
    },
  },
});

export const { setBusy, setError, setAuthToken, setMobileNumber } = authSlice.actions;

export const signIn = (mobileNumber: string, password: string): AppThunk => async (dispatch) => {
  dispatch(setBusy(true));
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signIn`, { mobileNumber, password });
    dispatch(setAuthToken(response.data.token));
    dispatch(setMobileNumber(mobileNumber));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || 'Sign in failed'));
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
  password: string
): AppThunk => async (dispatch) => {
  dispatch(setBusy(true));
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
    });
    console.log(response);
    dispatch(signIn(mobileNumber, password)); // Automatically sign in the user after registration
  } catch (error) {
    dispatch(setError(error.response?.data?.message || 'Registration failed'));
  } finally {
    dispatch(setBusy(false));
  }
};

export default authSlice.reducer;
