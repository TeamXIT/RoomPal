import axios from 'axios';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import API_BASE_URL from '../config/apiConfig';
import { AppThunk } from '../store';

type Room = {
  roomName: string;
  details: string;
  availability: boolean;
  roomType: string;
  floor: number;
  rent: number;
  location: string;
  amenities: string[];
  gender: string;
};

type RoomState = {
  screen: {
    isBusy: boolean;
    error: string;
    success: string;
  };
  data: Room[];
  totalPages: number;
  totalCount: number;
};

const initialState: RoomState = {
  screen: {
    isBusy: false,
    error: '',
    success: '',
  },
  data: [],
  totalPages: 0,
  totalCount: 0,
};

export const roomSlice = createSlice({
  name: 'room',
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
    setRooms: (state, action: PayloadAction<{ data: Room[], totalPages: number, totalCount: number }>) => {
      state.data = action.payload.data;
      state.totalPages = action.payload.totalPages;
      state.totalCount = action.payload.totalCount;
    },
    addRoom: (state, action: PayloadAction<Room>) => {
      state.data.push(action.payload);
    },
    updateRoom: (state, action: PayloadAction<Room>) => {
      const index = state.data.findIndex(room => room._id === action.payload._id);
      if (index !== -1) {
        state.data[index] = action.payload;
      }
    },
  },
});

export const { setBusy, setError, setSuccess, setRooms, addRoom, updateRoom } = roomSlice.actions;

export const createRoom = (roomName: string,
  details: string,
  availability: boolean,
  roomType: string,
  floor: number,
  rent: number,
  location: string,
  amenities: string[],
  gender: string,
): AppThunk => async (dispatch) => {
  dispatch(setBusy(true));
  dispatch(setError(''));
  dispatch(setSuccess(''));
  try {
    // console.log(`data: ${roomData}`);
    const response = await axios.post(`${API_BASE_URL}/room/create`, { 
      roomName,
      details,
      availability,
      roomType,
      floor,
      rent,
      location,
      amenities,
      gender
    });
    console.log(response.data)
    dispatch(addRoom(response.data.data));
    dispatch(setSuccess('Room created successfully.'));
  } catch (error) {
    console.error(error);
    dispatch(setError(error.response?.data?.message || error.message || 'Room creation failed'));
   
  } finally {
    dispatch(setBusy(false));
  }
};

export const fetchRooms = (limit: number = 10, page: number = 1, filters: Partial<Room> = {}): AppThunk => async (dispatch) => {
  dispatch(setBusy(true));
  dispatch(setError(''));
  dispatch(setSuccess(''));
  try {
    const response = await axios.get(`${API_BASE_URL}/rooms`, {
      params: { limit, page, ...filters },
    });
    dispatch(setRooms({
      data: response.data.data,
      totalPages: response.data.totalPages,
      totalCount: response.data.totalCount,
    }));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error.message || 'Fetching rooms failed'));
    console.error(error);
  } finally {
    dispatch(setBusy(false));
  }
};

export const modifyRoomDetails = (roomId: string, updateData: Partial<Room>): AppThunk => async (dispatch) => {
  dispatch(setBusy(true));
  dispatch(setError(''));
  dispatch(setSuccess(''));
  try {
    const response = await axios.put(`${API_BASE_URL}/rooms/${roomId}`, { updateData, roomId });
    dispatch(updateRoom(response.data.data));
    dispatch(setSuccess('Room updated successfully.'));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error.message || 'Updating room details failed'));
    console.error(error);
  } finally {
    dispatch(setBusy(false));
  }
};

export default roomSlice.reducer;
