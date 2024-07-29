import axios from 'axios';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import API_BASE_URL from '../config/apiConfig';
import { AppThunk } from '../store';


type Room = {
 
  data: any;
  success: Room;
  roomName: string;
  details: string[];
  availability: boolean;
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
    floor: 0,
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



const customConfig = {
  headers: { "Content-Type": "application/json" }
}


export const { setBusy, setError, setSuccess, setRooms, addRoom, updateRoom, roomData } = roomSlice.actions;

export const createRoom = (room: Room): AppThunk => async (dispatch) => {
  dispatch(setBusy(true));
  dispatch(setError(''));
  dispatch(setSuccess(''));
  try {
    console.log('create params:', room);
    const response = await axios.post(`${API_BASE_URL}/room/create`,{params:{
      roomName:room.roomName, 
      details:room.details,
      availability:room.availability,
      roomType:room.roomType,
      floor:room.floor,
      rent:room.rent,
      location:room.location,
      amenities:room.amenities,
      gender:room.gender,
      images:room.images,
      whatsappLink:room.whatsappLink,
      telegramLink:room.telegramLink
    } }, customConfig);
    dispatch(addRoom(response.data.data));
    dispatch(setSuccess('Room created successfully.'));
    dispatch(fetchRooms()); // Fetch the updated list of rooms
  } catch (error) {
    console.log('roomcreateError', error);
    dispatch(setError(error.response?.data?.message || error.message || 'Room creation failed'));

  } finally {
    dispatch(setBusy(false));
  }
};


export const fetchRooms = (limit: number = 10, page: number = 1, filters: Partial<Room> = {}): AppThunk => async (dispatch) => {
  try {
    dispatch(setBusy(true));
    dispatch(setError(''));
    dispatch(setSuccess(''));

    const response = await axios.get(`${API_BASE_URL}/room/getAll`, {
      params: { limit, page, ...filters },
    });
    if (response?.status == 200) {
      dispatch(setRooms({
        data: response.data.data,
        totalPages: response.data.totalPages,
        totalCount: response.data.totalCount,
      }));
    }
  } catch (error) {
    dispatch(setError(error?.response?.data?.message || error?.message || 'Fetching rooms failed'));
  } finally {
    dispatch(setBusy(false));
  }
};

export const fetchRoomByName = (roomName: string): AppThunk => async (dispatch) => {
  try {
    dispatch(setBusy(true));
    dispatch(setError(''));

    const response = await axios.get(`${API_BASE_URL}/room/getByName`, {
      params: { roomName: roomName },
    });
    console.log('room details:',response)

    if (response?.status == 200) {
      dispatch(addRoom(response.data.data)); // Assuming addRoom adds a single room to state
      dispatch(setSuccess('Room fetched successfully.'));
    }

  } catch (error) {
    dispatch(setError(error?.response?.data?.message || error?.message || 'Fetching room failed'));
  } finally {
    dispatch(setBusy(false));
  }
};

export const fetchRoomById = (roomId: string): AppThunk => async (dispatch) => {
  dispatch(setBusy(true));
  dispatch(setError(''));
  dispatch(setSuccess(''));

  try {
    console.log('Fetching Room ID:', roomId); // Ensure roomId is correctly logged

    const response = await axios.get(`${API_BASE_URL}/room/getById`, {
       params: { room_id:roomId },
      
    });
    if (response?.status === 200) {
      console.log('Room details:', response.data);
    console.log(response.data);
    dispatch(roomData(response.data.data)); 
    dispatch(setSuccess('Room fetched successfully.'));
  }else {
    dispatch(setError('Failed to fetch room details.'));
  }
  } catch (error) {
    console.error('Error fetching room details:', error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
      console.error('Error response headers:', error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Error request data:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error message:', error.message);
    }
    console.error(error);

    dispatch(setError(error.response?.data?.message || error.message || 'Fetching room failed'));
  } finally {
    dispatch(setBusy(false));
  }
};

export const modifyRoomDetails = (roomId: string, updateData: Partial<Room>): AppThunk => async (dispatch) => {
  try {
    dispatch(setBusy(true));
    dispatch(setError(''));
    dispatch(setSuccess(''));

    const response = await axios.put(`${API_BASE_URL}/rooms/${roomId}`, { updateData, roomId }, customConfig);
    if (response?.status == 200) {
      dispatch(updateRoom(response.data.data));
      dispatch(setSuccess('Room updated successfully.'));
    }
  } catch (error) {
    dispatch(setError(error?.response?.data?.message || error?.message || 'Updating room details failed'));
  } finally {
    dispatch(setBusy(false));
  }
};

export default roomSlice.reducer;
