import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import API_BASE_URL from '../config/apiConfig';
import { AppThunk } from '../store';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Room = {
    roomId: string;
    _id:string;
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
  
  
type FavoriteState = {
  screen: {
    isBusy: boolean;
    error: string;
    success: string;
  };
  favorites: Room[]; // Array of favorite rooms
};

const initialState: FavoriteState = {
  screen: {
    isBusy: false,
    error: '',
    success: '',
  },
  favorites: [],
};

export const favoriteSlice = createSlice({
  name: 'favorite',
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
    setFavorites: (state, action: PayloadAction<Room[]>) => {
      state.favorites = action.payload;
    },
    // addFavorite: (state, action: PayloadAction<Room>) => {
    //   state.favorites.push(action.payload);
    // },
    // removeFavorite: (state, action: PayloadAction<string>) => {
    //   state.favorites = state.favorites.filter(room => room._id !== action.payload);
    // },
  },
});

const customConfig = {
  headers: { "Content-Type": "application/json" }
}

export const { setBusy, setError, setSuccess, setFavorites } = favoriteSlice.actions;

export const addToFavorites = (roomId: string): AppThunk => async (dispatch) => {
    console.log(roomId);
  try {
    dispatch(setBusy(true));
    dispatch(setError(''));
    dispatch(setSuccess(''));

    const userId = await AsyncStorage.getItem('userId');
    console.log('add userId',userId);
    if (!userId) {
      throw new Error('User ID not found');
    }

    const response = await axios.put(`${API_BASE_URL}/user/addToFavourites?userId=${userId}&roomId=${roomId}`,  {   userId, roomId  });
   
    if (response?.status === 200) {
        console.log('add response',response.data);
    //   dispatch(addFavorite(response.data.data));
      dispatch(setSuccess('Room added to favorites.'));
    } else {
      throw new Error('Failed to add room to favorites.');
    }
  } catch (error) {
    console.log(error);
    dispatch(setError(error.response?.data?.message || error?.message || 'Adding to favorites failed.'));
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
    console.log('remove userId',userId);
    if (!userId) {
      throw new Error('User ID not found');
    }

    const response = await axios.put(`${API_BASE_URL}/user/removeFromFavourites?userId=${userId}&roomId=${roomId}`,  { userId, roomId }, customConfig);
  
    if (response?.status === 200) {
        console.log('remove response',response.data);
    //   dispatch(removeFavorite(roomId));
      dispatch(setSuccess('Room removed from favorites.'));
    }
  } catch (error) {
    console.log(error);
    dispatch(setError(error.response?.data?.message || error?.message || 'Removing from favorites failed.'));
  } finally {
    dispatch(setBusy(false));
  }
  console.log('end');
};

export const fetchFavorites = (): AppThunk => async (dispatch) => {
  try {
    dispatch(setBusy(true));
    dispatch(setError(''));

    const userId = await AsyncStorage.getItem('userId');
    if (!userId) {
      throw new Error('User ID not found');
    }

    const response = await axios.get(`${API_BASE_URL}/user/getFavourites`, {
      params: { userId },
    });
    if (response?.status === 200) {
      dispatch(setFavorites(response.data.data));
      dispatch(setSuccess('Favorites fetched successfully.'));
    }
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error?.message || 'Fetching favorites failed.'));
  } finally {
    dispatch(setBusy(false));
  }
};

export default favoriteSlice.reducer;
