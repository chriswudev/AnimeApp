import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {AnimePayload, AnimeState} from '../../types';
import {getAnimes} from './animesApi';
import {uniqueArray} from '../../utils/array';
import {AnimeApiStatus} from '../../enums';
import {AnimeQuery} from '../../types';

const initialState: AnimeState = {
  animes: [],
  status: AnimeApiStatus.Idle,
  error: null,
  page: 1,
  hasMore: true,
};

// Asynchronous thunk action
export const fetchAnimes = createAsyncThunk(
  'animes/fetchAnimes',
  async ({query, page}: AnimeQuery, {rejectWithValue}) => {
    try {
      return await getAnimes({query, page});
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  },
);

const animeSlice = createSlice({
  name: 'animes',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAnimes.pending, state => {
        state.status =
          state.page === 1
            ? AnimeApiStatus.Loading
            : AnimeApiStatus.LoadingMore;
      })
      .addCase(
        fetchAnimes.fulfilled,
        (state, action: PayloadAction<AnimePayload>) => {
          state.page = action.payload.pagination.current_page;
          state.animes =
            state.page === 1
              ? action.payload.data
              : uniqueArray(
                  [...state.animes, ...action.payload.data],
                  'mal_id',
                );
          state.status = AnimeApiStatus.Succeeded;
          state.hasMore = action.payload.pagination.has_next_page;
        },
      )
      .addCase(fetchAnimes.rejected, (state, action) => {
        state.status = AnimeApiStatus.Failed;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default animeSlice.reducer;
