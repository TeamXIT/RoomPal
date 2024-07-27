import axios from 'axios';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import API_BASE_URL from '../config/apiConfig';
import { AppThunk } from '../store';

type Room = {
  roomName: string;
  details: string[];
  availability: boolean;
  roomType: string;
  floor: string; 
  rent: number;
  location: Location;
  amenities: Amenities;
  gender: string;
  whatsappLink: string;
  telegramLink: string;
  images: string[];
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

type RoomState = {
  screen: {
    isBusy: boolean;
    error: string;
    success: string;
  };
  data: Room[];
  totalPages: number;
  totalCount: number;
  roomData: Room;
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
  roomData: {
    roomName: '',
    details: [],
    availability: false,
    roomType: '',
    floor: '', 
    rent: 0,
    location: { lat: 0, lon: 0 },
    amenities: {
      wifi: false,
      airCondition: false,
      heater: false,
      washer: false,
      dryer: false,
      kitchen: false,
      parking: false,
      gym: false,
      pool: false,
    },
    gender: '',
    whatsappLink: '',
    telegramLink: '',
    images: [],
  },
};


const customConfig = {
  headers: { "Content-Type": "application/json"}
}

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
    roomData: (state, action: PayloadAction<Room>) => {
      state.roomData = action.payload;
    },
  },
});

export const { setBusy, setError, setSuccess, setRooms, addRoom, updateRoom, roomData } = roomSlice.actions;

export const createRoom = (room: Room): AppThunk => async (dispatch) => {
  dispatch(setBusy(true));
  dispatch(setError(''));
  dispatch(setSuccess(''));
  try {
    
    console.log('create params:', room);
    
    const response = await axios.post(`${API_BASE_URL}/room/create`, {
      roomName: room.roomName,
      details: room.details,
      availability: room.availability,
      roomType: room.roomType,
      floor: room.floor,
      rent: room.rent,
      location: room.location,
      amenities: room.amenities,
      gender: room.gender,
      images: room.images,
      whatsappLink: room.whatsappLink,
      telegramLink: room.telegramLink,
    },customConfig);
    //  console.log('API Response:', response);
    //  console.log('Response Data:', response.data);

    if (response.data && response.data.success) { //indicating that the creation was successful.
      
      dispatch(setSuccess('Room created successfully.'));
      dispatch(fetchRooms( )); // Optionally refresh room list
    } 
  } catch (error) {
    console.log('Room create error:', error);
    dispatch(setError(error.message || 'Room creation failed'));
     
    } 
   finally {
    dispatch(setBusy(false));
  }
};

export const fetchRooms = (page: number, limit: number = 20, filters: Partial<Room> = {}): AppThunk => async (dispatch) => {
  dispatch(setBusy(true));
  dispatch(setError(''));
  dispatch(setSuccess(''));
  try {
    const response = await axios.get(`${API_BASE_URL}/room/getAll`, {
      params: { limit, page, ...filters },
    }, customConfig);

    dispatch(setRooms({
      data: response.data.data,
      totalPages: response.data.totalPages,
      totalCount: response.data.totalCount,
    }));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error.message || 'Fetching rooms failed'));
  } finally {
    dispatch(setBusy(false));
  }
};





export const fetchRoomByName = (roomName: string): AppThunk => async (dispatch) => {
  dispatch(setBusy(true));
  dispatch(setError(''));
  try {
    roomName = roomName.toString();
    const response = await axios.get(`${API_BASE_URL}/room/getByName`, {
      params: { roomName },
    },customConfig);
    console.log(response.data);
    dispatch(addRoom(response.data.data)); // Assuming addRoom adds a single room to state
    dispatch(setSuccess('Room fetched successfully.'));
    
  } catch (error) {
    console.error(error);
    dispatch(setError(error.response?.data?.message || error.message || 'Fetching room failed'));
    
  } finally {
    dispatch(setBusy(false));
  }
};

export const fetchRoomById = (roomId: string): AppThunk => async (dispatch) => {
  dispatch(setBusy(true));
  dispatch(setError(''));
  try {
    const response = await axios.get(`${API_BASE_URL}/room/getById`, {
      params: { room_id: roomId },
    },customConfig);
    console.log(response.data);
    dispatch(roomData(response.data.data));
    dispatch(setSuccess('Room fetched successfully.'));
  } catch (error) {
    console.error(error);
    dispatch(setError(error.response?.data?.message || error.message || 'Fetching room failed'));
  } finally {
    dispatch(setBusy(false));
  }
};

export const modifyRoomDetails = (roomId: string, updateData: Partial<Room>): AppThunk => async (dispatch) => {
  dispatch(setBusy(true));
  dispatch(setError(''));
  dispatch(setSuccess(''));
  try {
    const response = await axios.put(`${API_BASE_URL}/rooms/${roomId}`, { updateData, roomId },customConfig);
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
