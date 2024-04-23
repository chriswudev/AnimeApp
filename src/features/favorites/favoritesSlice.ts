import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = 'FAVORITES_KEY';

export const fetchFavorites = createAsyncThunk(
  'favorites/fetchFavorites',
  async () => {
    const jsonString = await AsyncStorage.getItem(FAVORITES_KEY);
    return jsonString ? JSON.parse(jsonString) : [];
  },
);

export const toggleFavorite = createAsyncThunk(
  'favorites/toggleFavorite',
  async (animeId: number) => {
    const jsonString = await AsyncStorage.getItem(FAVORITES_KEY);
    let favorites = jsonString ? JSON.parse(jsonString) : [];
    if (favorites.includes(animeId)) {
      favorites = favorites.filter((id: number) => id !== animeId);
    } else {
      favorites.push(animeId);
    }
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    return favorites;
  },
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    favorites: [] as number[],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        state.favorites = action.payload;
      });
  },
});

export default favoritesSlice.reducer;
