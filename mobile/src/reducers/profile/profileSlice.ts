import axios from 'axios';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import API_BASE_URL from '../config/apiConfig';
import { AppThunk } from '../store';

type ProfileState = {
    screen: {
      isBusy: boolean;
      error: string;
      success: string;
    };
    data: {
    user:{}
    };
  };
  const initialState:  ProfileState = {
    screen: {
      isBusy: false,
      error: '',
      success: '',
    },
    data: {
        user:{}
    },
  };
  export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers:{
        setBusy:(state,action:PayloadAction<boolean>)=>{
            state.screen.isBusy=action.payload;
        },
        setError:(state,action:PayloadAction<string>)=>{
            state.screen.error=action.payload;
        },
        setSuccess:(state,action:PayloadAction<string>)=>{
            state.screen.success=action.payload;
        },
        setUser:(state,action:PayloadAction<any>)=>{
            state.data.user=action.payload;
        }
    }
  })
  export const {setUser, setBusy, setError, setSuccess } = profileSlice.actions;

  export const fetchProfile=(mobileNumber:string):AppThunk => async (dispatch) => {
    dispatch(setBusy(true));
    dispatch(setError(''));
    dispatch(setSuccess(''));
    try {
      const response = await axios.get('${API_BASE_URL}/user/getByNumber',{mobileNumber});
      dispatch(setSuccess('Profile fetched successfully.'));
      dispatch(setBusy(false));
      dispatch(setUser(response.data));
    } catch (error) {
      dispatch(setError(error.response?.data?.message || error.message || 'Fetching profile failed.'));
      dispatch(setBusy(false));
    }
  }