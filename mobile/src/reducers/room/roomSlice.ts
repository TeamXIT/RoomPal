import axios from 'axios';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../config/appConfig';


type Room = {
  roomId: string;
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
  userRooms: Room[];
  totalPages: number;
  totalCount: number;
  roomData: Room;
  favorites: string[]; // Array of room IDs

};

const initialState: RoomState = {
  screen: {
    isBusy: false,
    error: '',
    success: '',
  },
  data: [],
  userRooms: [],
  totalPages: 0,
  totalCount: 0,
  roomData: {
    userId: '',
    roomName: '',
    details: [],
    availability: 0,
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
  favorites: [], // Initialize empty favorites

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
    setUserRooms: (state, action: PayloadAction<Room[]>) => {
      state.userRooms = action.payload;
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
    setFavorites: (state, action: PayloadAction<string[]>) => {
      state.favorites = action.payload;
    },
    addFavorite: (state, action: PayloadAction<string>) => {
      state.favorites.push(action.payload);
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(roomId => roomId !== action.payload);
    },
  },
});

const customConfig = {
  headers: { "Content-Type": "application/json" }
}


export const { setBusy, setError, setSuccess, setRooms, addRoom, updateRoom, roomData, setFavorites, addFavorite, removeFavorite } = roomSlice.actions;


export const createRoom = (room: Room): AppThunk => async (dispatch) => {
  dispatch(setBusy(true));
  dispatch(setError(''));
  dispatch(setSuccess(''));
  try {
    const response = await axios.post(`${API_BASE_URL}/room/create`, {
      userId: room.userId,
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
      telegramLink: room.telegramLink
    });
    if (response.status == 200) {
      dispatch(addRoom(response.data.data));
      dispatch(setSuccess('Room created successfully.'));
      dispatch(fetchRooms());
    }
    // Fetch the updated list of rooms
  } catch (error) {

    dispatch(setError(error.response?.data?.message || error.message || 'Room creation failed'));

  } finally {
    dispatch(setBusy(false));
  }
};

export const fetchRooms = (limit = 20, page = 1, minRent: string, maxRent: string, gender: string, roomType: string, location: any, availability: any): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(setBusy(true));
    dispatch(setError(''));
    dispatch(setSuccess(''));

    // Construct query parameters based on filters
    const queryParams: any = { limit, page };

    if (minRent !== "" && minRent !== null) queryParams.minRent = minRent;
    if (maxRent !== "" && maxRent !== null) queryParams.maxRent = maxRent;
    if (gender) queryParams.gender = gender;
    if (roomType) queryParams.roomType = roomType;
    if (location) queryParams.location = location;
    if (availability !== 0 && availability !== null) queryParams.availability = availability;

    const response = await axios.get(`${API_BASE_URL}/room/getAll`, {
      params: queryParams,
    });

    if (response?.status === 200) {
      const { data, totalPages, totalCount } = response.data;
      const currentState = getState().room.data;

      dispatch(setRooms({
        data: page === 1 ? data : [...currentState, ...data],
        totalPages,
        totalCount,
      }));
    }
  } catch (error) {
    dispatch(setError(error?.response?.data?.message || error?.message || 'Fetching rooms failed'));
  } finally {
    dispatch(setBusy(false));
  }
};

export const fetchUserRooms = (userId: string): AppThunk => async (dispatch) => {
  try {
    dispatch(setBusy(true));
    dispatch(setError(''));

    const response = await axios.get(`${API_BASE_URL}/room/getUserRooms`, {
      params: { userId },
    });

    if (response?.status === 200) {
      dispatch(setUserRooms(response.data.data)); // Update this line
      dispatch(setSuccess('User rooms fetched successfully.'));
    }
  } catch (error) {
    dispatch(setError(error?.response?.data?.message || error?.message || 'Fetching rooms failed'));
  } finally {
    dispatch(setBusy(false));
  }
};

export const fetchRoomById = (roomId: string): AppThunk => async (dispatch) => {
  dispatch(setBusy(true));
  dispatch(setError(''));
  dispatch(setSuccess(''));

  try {
    const response = await axios.get(`${API_BASE_URL}/room/getById`, {
      params: { room_id: roomId },
    });
    if (response?.status === 200) {
      //   console.log('Room details:', response.data);
      // console.log(response.data);
      dispatch(roomData(response.data.data));
      dispatch(setSuccess('Room fetched successfully.'));
    } else {
      dispatch(setError('Failed to fetch room details.'));
    }
  } catch (error) {



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

export const addToFavorites = (roomId: string,): AppThunk => async (dispatch) => {
  try {
    dispatch(setBusy(true));
    dispatch(setError(''));
    dispatch(setSuccess(''));
    console.log('user id in api:', roomId)

    const userId = await AsyncStorage.getItem('userId');
    if (!userId) {
      throw new Error('User ID not found');
    }

    console.log('User ID:', userId);
    console.log('Room ID:', roomId);

    console.log('userid:', userId)
    const response = await axios.put(`${API_BASE_URL}/user/addToFavourites?userId=${userId}&roomId=${roomId}`, { userId, roomId }, customConfig);
    console.log('add response:', response);

    if (response?.status === 200) {
      dispatch(addFavorite(roomId));
      dispatch(setSuccess('Room added to favorites.'));
      console.log('add favorite to favorite rooms');
    } else {
      throw new Error('Failed to add room to favorites.');
    }
  } catch (error) {
    console.log('add error:', error);
    dispatch(setError(error?.response?.data?.message || error?.message || 'Adding to favorites failed.'));
  } finally {
    dispatch(setBusy(false));
  }
};


export const removeFromFavorites = (roomId: string): AppThunk => async (dispatch) => {
  try {
    dispatch(setBusy(true));
    dispatch(setError(''));
    dispatch(setSuccess(''));

    const userId = await AsyncStorage.getItem('userId');
    if (!userId) {
      throw new Error('User ID not found');
    }

    const response = await axios.put(`${API_BASE_URL}/user/removeFromFavourites?userId=${userId}&roomId=${roomId}`, { userId, roomId });
    console.log('remove response:', response);

    if (response?.status === 200) {
      dispatch(removeFavorite(roomId));
      dispatch(setSuccess('Room removed from favorites.'));
      console.log('remove feverite to feverite rooms')

    }
  } catch (error) {
    console.log("remove error:", error)

    dispatch(setError(error?.response?.data?.message || error?.message || 'Removing from favorites failed.'));
  } finally {
    dispatch(setBusy(false));
  }
};

export default roomSlice.reducer;
